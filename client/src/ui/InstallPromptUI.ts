import { i18n } from '../utils/i18n';

/**
 * Premium PWA Install Prompt System
 * Handles the beforeinstallprompt event and provides a high-fidelity UI.
 */
export class InstallPromptUI {
    static readonly STORAGE_KEY = 'zigma_pwa_dismissed_v2';
    private static initDone = false;
    private static isVisible = false;

    static init() {
        if (this.initDone) return;
        this.initDone = true;

        // Listen for the prompt ready event from index.html
        window.addEventListener('zigmaPromptReady', () => {
            console.log('[PWA] 🚀 Prompt is ready, checking if we should show UI');
            this.checkAndShowAuto();
        });

        // Fallback for module-level capture
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            (window as any).zigmaDeferredPrompt = e;
            this.checkAndShowAuto();
        });

        // Handle successful installation
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] 🎉 App installed successfully!');
            (window as any).zigmaDeferredPrompt = null;
            this.hide();
            localStorage.setItem(this.STORAGE_KEY, 'installed');
        });

        // Re-render on language change
        window.addEventListener('languageChanged', () => {
            if (this.isVisible) this.render();
        });

        // Initial check if prompt already stashed
        if ((window as any).zigmaDeferredPrompt) {
            this.checkAndShowAuto();
        }
    }

    private static checkAndShowAuto() {
        const status = localStorage.getItem(this.STORAGE_KEY);
        if (status === 'dismissed' || status === 'installed') return;

        // Show automatically after a short delay to not overwhelm the user
        setTimeout(() => {
            if ((window as any).zigmaDeferredPrompt && !this.isVisible) {
                this.show();
            }
        }, 2000);
    }

    static render() {
        let container = document.getElementById('install-prompt-ui');

        if (!container) {
            container = document.createElement('div');
            container.id = 'install-prompt-ui';
            // Premium positioning and glass effect container
            container.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[9999] hidden pointer-events-auto transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)';
            document.body.appendChild(container);
        }

        const isArabic = i18n.getLanguage() === 'ar';

        container.innerHTML = `
            <div class="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group" ${isArabic ? 'dir="rtl"' : ''}>
                <!-- Animated Background Accents -->
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#72BF78]/20 rounded-full blur-3xl animate-pulse"></div>
                <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FEFF9F]/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
                
                <!-- Close Button -->
                <button id="install-close-btn" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white/60 hover:text-white hover:bg-black/40 transition-all z-20">
                    <span class="material-symbols-outlined text-lg">close</span>
                </button>

                <div class="relative z-10 flex flex-col gap-5">
                    <div class="flex items-center gap-4">
                        <!-- Icon with glow -->
                        <div class="relative">
                            <div class="absolute inset-0 bg-[#72BF78] blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div class="relative w-14 h-14 bg-gradient-to-br from-[#72BF78] to-[#478D47] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                                <span class="material-symbols-outlined text-white text-3xl" style="font-variation-settings: 'FILL' 1;">install_desktop</span>
                            </div>
                        </div>
                        
                        <div class="flex flex-col gap-1">
                            <h3 class="text-white font-['Retro_Gaming'] text-sm tracking-wide leading-tight drop-shadow-md">
                                ${i18n.t('lobby.install_modal.title')}
                            </h3>
                            <p class="text-white/70 font-['Retro_Gaming'] text-[10px] leading-relaxed">
                                ${i18n.t('lobby.install_modal.desc')}
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-1">
                        <!-- Confirm Button -->
                        <button id="install-confirm-btn" class="flex-[2] py-3.5 bg-gradient-to-r from-[#72BF78] to-[#478D47] text-white font-['Retro_Gaming'] text-[10px] uppercase rounded-xl shadow-[0_4px_15px_rgba(71,141,71,0.4)] hover:shadow-[0_6px_20px_rgba(71,141,71,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-sm">download</span>
                            <span>${i18n.t('lobby.install_modal.confirm')}</span>
                        </button>
                        
                        <!-- Later Button -->
                        <button id="install-later-btn" class="flex-1 py-3.5 bg-white/10 text-white font-['Retro_Gaming'] text-[10px] uppercase rounded-xl border border-white/10 hover:bg-white/20 active:scale-[0.98] transition-all">
                            ${i18n.t('lobby.install_modal.cancel')}
                        </button>
                    </div>
                </div>
                
                <!-- Bottom Decoration -->
                <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#72BF78] to-transparent opacity-50"></div>
            </div>
        `;

        const closeBtn = document.getElementById('install-close-btn');
        const laterBtn = document.getElementById('install-later-btn');
        const confirmBtn = document.getElementById('install-confirm-btn');

        if (closeBtn) closeBtn.onclick = () => this.hide(true);
        if (laterBtn) laterBtn.onclick = () => this.hide(true);
        if (confirmBtn) confirmBtn.onclick = () => this.handleInstall();
    }

    private static async handleInstall() {
        const deferredPrompt = (window as any).zigmaDeferredPrompt;
        
        if (!deferredPrompt) {
            console.error('[PWA-ERROR] No prompt available. Possible reasons:');
            console.error('1. App is already installed.');
            console.error('2. Service Worker or Manifest has an error (check console).');
            console.error('3. You are not using HTTPS or localhost.');
            console.error('4. Browser has not decided this site is installable yet (try scrolling/clicking around).');
            this.show();
            return;
        }

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`[PWA-SUCCESS] Outcome: ${outcome}`);
            
            if (outcome === 'accepted') {
                localStorage.setItem(this.STORAGE_KEY, 'installed');
                this.hide();
                (window as any).zigmaDeferredPrompt = null;
            }
        } catch (err) {
            console.error('[PWA-CRITICAL] Prompt failed:', err);
        }
    }

    static async triggerPrompt() {
        const deferredPrompt = (window as any).zigmaDeferredPrompt;
        if (deferredPrompt) {
            this.handleInstall();
        } else {
            // If already installed or not supported, show the UI as fallback
            // to explain how to install or just show the "Wow" design.
            this.show();
        }
    }

    static show() {
        this.render();
        this.isVisible = true;
        const el = document.getElementById('install-prompt-ui');
        if (el) {
            el.classList.remove('hidden');
            // Animate in
            requestAnimationFrame(() => {
                el.style.transform = 'translate(-50%, 0)';
                el.style.opacity = '1';
                el.classList.add('translate-y-0');
            });
        }
    }

    static hide(dismiss: boolean = false) {
        this.isVisible = false;
        const el = document.getElementById('install-prompt-ui');
        if (el) {
            el.style.transform = 'translate(-50%, 50px)';
            el.style.opacity = '0';
            setTimeout(() => el.classList.add('hidden'), 500);
        }
        if (dismiss) {
            localStorage.setItem(this.STORAGE_KEY, 'dismissed');
        }
    }
}

