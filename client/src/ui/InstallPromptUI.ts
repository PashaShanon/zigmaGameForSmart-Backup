import { i18n } from '../utils/i18n';

export class InstallPromptUI {
    private static deferredPrompt: any = null;

    static init() {
        console.log("[PWA] Handler Initialized. Waiting for beforeinstallprompt event...");
        
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log("[PWA] 📥 beforeinstallprompt event fired!");
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            this.deferredPrompt = e;
            // Show the install button/banner
            this.show();
        });

        window.addEventListener('appinstalled', () => {
            console.log('[PWA] 🎉 App was installed successfully');
            this.hide();
        });
    }

    static render() {
        if (document.getElementById('install-prompt-ui')) return;

        const container = document.createElement('div');
        container.id = 'install-prompt-ui';
        container.className = 'fixed bottom-4 left-4 z-[9999] hidden pointer-events-auto max-w-[320px] w-[calc(100%-32px)]';
        container.innerHTML = `
            <div class="relative bg-[#1a1a20] border-4 border-[#6CC452] border-b-[8px] border-b-[#478D47] rounded-[24px] p-5 shadow-2xl overflow-hidden group">
                <!-- Diagonal Pattern Overlay -->
                <div class="absolute inset-0 opacity-[0.05] pointer-events-none" style="background-image: radial-gradient(#6CC452 1px, transparent 1px); background-size: 8px 8px;"></div>
                
                <!-- Close Button -->
                <button id="install-close-btn" class="absolute top-3 right-3 text-[#6CC452]/50 hover:text-[#6CC452] transition-colors">
                    <span class="material-symbols-outlined text-xl">close</span>
                </button>

                <div class="relative z-10 flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-[#F1F8E9] border-2 border-[#478D47] rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            <span class="material-symbols-outlined text-[#478D47] text-2xl" style="font-variation-settings: 'FILL' 1;">download_for_offline</span>
                        </div>
                        <div class="flex flex-col">
                            <h3 class="text-white font-['Retro_Gaming'] text-xs md:text-sm uppercase tracking-wider leading-tight">INSTAL ZIGMA GAME!</h3>
                        </div>
                    </div>

                    <div class="flex gap-3 mt-1">
                        <button id="install-confirm-btn" class="flex-1 py-2.5 bg-[#6CC452] text-white font-['Retro_Gaming'] text-[10px] uppercase rounded-xl border-b-4 border-[#478D47] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all shadow-lg">
                            ${i18n.t('lobby.install_modal?.confirm') || 'INSTAL'}
                        </button>
                        <button id="install-later-btn" class="px-5 py-2.5 bg-[#2d2d35] text-[#6CC452] font-['Retro_Gaming'] text-[10px] uppercase rounded-xl border-b-4 border-black/30 hover:bg-[#35353d] active:border-b-0 active:translate-y-1 transition-all">
                            ${i18n.t('lobby.install_modal?.cancel') || 'NANTI'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(container);

        // Bind events
        document.getElementById('install-close-btn')!.onclick = () => this.hide();
        document.getElementById('install-later-btn')!.onclick = () => this.hide();
        document.getElementById('install-confirm-btn')!.onclick = () => this.handleInstall();
    }

    private static async handleInstall() {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        this.deferredPrompt = null;
        this.hide();
    }

    static show() {
        this.render();
        const el = document.getElementById('install-prompt-ui');
        if (el) el.classList.remove('hidden');
    }

    static hide() {
        const el = document.getElementById('install-prompt-ui');
        if (el) el.classList.add('hidden');
    }
}
