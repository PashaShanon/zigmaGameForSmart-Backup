import { i18n } from '../utils/i18n';

// We now rely on the inline script in index.html to capture the event early
// into (window as any).zigmaDeferredPrompt.
let _pendingAutoShow = false;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    (window as any).zigmaDeferredPrompt = e;
    console.log('[PWA] 📥 beforeinstallprompt captured at module level (fallback)');

    const dismissed = sessionStorage.getItem(InstallPromptUI.STORAGE_KEY);
    if (!dismissed) {
        _pendingAutoShow = true;
        setTimeout(() => {
            if (_pendingAutoShow) {
                _pendingAutoShow = false;
                InstallPromptUI.show();
            }
        }, 300);
    }
});

window.addEventListener('appinstalled', () => {
    console.log('[PWA] 🎉 App installed successfully');
    (window as any).zigmaDeferredPrompt = null;
    _pendingAutoShow = false;
    InstallPromptUI.hide();
    sessionStorage.setItem(InstallPromptUI.STORAGE_KEY, 'true');
});
// ─────────────────────────────────────────────────────────────────────────────

export class InstallPromptUI {
    static readonly STORAGE_KEY = 'zigma_pwa_dismissed';
    private static initDone = false;

    static init() {
        if (this.initDone) return;
        this.initDone = true;

        // Re-render the modal content when language changes (if visible)
        window.addEventListener('languageChanged', () => {
            const el = document.getElementById('install-prompt-ui');
            if (el && !el.classList.contains('hidden')) {
                this.render();
            }
        });
    }

    static render() {
        let container = document.getElementById('install-prompt-ui');

        if (!container) {
            container = document.createElement('div');
            container.id = 'install-prompt-ui';
            container.className = 'fixed bottom-4 left-4 w-[calc(100vw-2rem)] max-w-[320px] z-[9999] hidden pointer-events-auto transform transition-all duration-500 ease-out translate-y-10 opacity-0';
            document.body.appendChild(container);
        }

        // Always refresh innerHTML so translations follow the current locale
        container.innerHTML = `
            <div class="relative bg-white/95 backdrop-blur-md border-2 border-[#6CC452] rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden group">
                <div class="absolute -top-8 -right-8 w-24 h-24 bg-[#6CC452]/10 rounded-full blur-2xl pointer-events-none"></div>
                <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-[#478D47]/10 rounded-full blur-2xl pointer-events-none"></div>

                <button id="install-close-btn" class="absolute z-20 top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-[#478D47]/40 hover:text-[#478D47] hover:bg-[#F1F8E9] transition-all">
                    <span class="material-symbols-outlined text-base">close</span>
                </button>

                <div class="relative z-10 flex flex-col gap-3">
                    <div class="flex items-start gap-3">
                        <div class="w-10 h-10 bg-[#F1F8E9] border-2 border-[#6CC452] rounded-xl flex items-center justify-center shrink-0 shadow group-hover:scale-110 transition-transform duration-300">
                            <span class="material-symbols-outlined text-[#478D47] text-xl" style="font-variation-settings: 'FILL' 1;">download_for_offline</span>
                        </div>
                        <div class="flex flex-col gap-0.5 pr-6">
                            <h3 class="text-[#478D47] font-['Retro_Gaming'] text-[11px] uppercase tracking-wider leading-tight">
                                ${i18n.t('lobby.install_modal.title')}
                            </h3>
                            <p class="text-[#478D47]/70 font-['Space_Grotesk'] text-[10px] leading-relaxed">
                                ${i18n.t('lobby.install_modal.desc')}
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button id="install-confirm-btn" class="flex-[2] py-2.5 bg-[#336B23] text-white font-['Retro_Gaming'] text-[10px] uppercase rounded-xl border-b-4 border-[#1F4514] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all shadow-md flex items-center justify-center gap-1.5">
                            <span class="material-symbols-outlined text-sm">download</span>
                            <span>${i18n.t('lobby.install_modal.confirm')}</span>
                        </button>
                        <button id="install-later-btn" class="flex-1 py-2.5 bg-[#F1F8E9] text-[#478D47] font-['Retro_Gaming'] text-[10px] uppercase rounded-xl border-b-4 border-[#6CC452]/30 hover:bg-[#E8F5E9] active:border-b-0 active:translate-y-1 transition-all">
                            ${i18n.t('lobby.install_modal.cancel')}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('install-close-btn')!.onclick = () => this.hide(true);
        document.getElementById('install-later-btn')!.onclick = () => this.hide(true);
        document.getElementById('install-confirm-btn')!.onclick = () => this.handleInstall();
    }

    private static async handleInstall() {
        const deferredPrompt = (window as any).zigmaDeferredPrompt;
        if (!deferredPrompt) {
            console.warn('[PWA] No deferred prompt — browser may not support install or app is already installed.');
            return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`[PWA] User response: ${outcome}`);
        if (outcome === 'accepted') {
            sessionStorage.setItem(this.STORAGE_KEY, 'true');
        }
        (window as any).zigmaDeferredPrompt = null;
        this.hide();
    }

    /**
     * Called from "Install App" menu button.
     * Fires native browser prompt if available, otherwise shows custom modal.
     */
    static async triggerPrompt() {
        const deferredPrompt = (window as any).zigmaDeferredPrompt;
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`[PWA] Direct prompt response: ${outcome}`);
            if (outcome === 'accepted') {
                sessionStorage.setItem(this.STORAGE_KEY, 'true');
            }
            (window as any).zigmaDeferredPrompt = null;
            this.hide();
        } else {
            // Fallback: show custom modal (dev/localhost or already installed)
            console.log('[PWA] No deferred prompt found, showing custom modal instead.');
            this.show();
        }
    }

    static show() {
        this.render(); // Always re-render with current locale
        const el = document.getElementById('install-prompt-ui');
        if (el) {
            el.classList.remove('hidden');
            requestAnimationFrame(() => {
                el.classList.remove('translate-y-10', 'opacity-0');
                el.classList.add('translate-y-0', 'opacity-100');
            });
        }
    }

    static hide(dismiss: boolean = false) {
        const el = document.getElementById('install-prompt-ui');
        if (el) {
            el.classList.add('translate-y-10', 'opacity-0');
            el.classList.remove('translate-y-0', 'opacity-100');
            setTimeout(() => el.classList.add('hidden'), 500);
        }
        if (dismiss) {
            sessionStorage.setItem(this.STORAGE_KEY, 'true');
        }
    }
}
