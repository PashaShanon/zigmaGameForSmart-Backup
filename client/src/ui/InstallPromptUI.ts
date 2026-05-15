import { i18n } from '../utils/i18n';

/**
 * Premium PWA Install Prompt System
 * Handles the beforeinstallprompt event and provides a high-fidelity UI.
 * 
 * Rules:
 * - Only shows on main lobby page (path === '/')
 * - Only shows after 10 hours since first visit (or 1 day if dismissed)
 * - Never shows again once the app is installed
 */
export class InstallPromptUI {
    static readonly STORAGE_KEY = 'zigma_pwa_dismissed_v2';
    static readonly FIRST_VISIT_KEY = 'zigma_pwa_first_visit';
    static readonly DISMISS_TIME_KEY = 'zigma_pwa_dismiss_time';
    private static initDone = false;
    private static isVisible = false;

    // Timing constants
    private static readonly FIRST_VISIT_DELAY_MS = 10 * 60 * 60 * 1000; // 10 hours
    private static readonly DISMISS_COOLDOWN_MS = 24 * 60 * 60 * 1000;  // 1 day

    static init() {
        if (this.initDone) return;
        this.initDone = true;

        // Record first visit timestamp if not already set
        if (!localStorage.getItem(this.FIRST_VISIT_KEY)) {
            localStorage.setItem(this.FIRST_VISIT_KEY, Date.now().toString());
        }

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

        // --- NEW: ROUTE PROTECTION ---
        // Hide prompt if user navigates away from lobby
        const handleRouteProtection = () => {
            if (!this.isOnMainLobby() && this.isVisible) {
                console.log('[PWA] 🛡️ Route protection: Hiding prompt (not on lobby)');
                this.hide();
            } else if (this.isOnMainLobby() && !this.isVisible && (window as any).zigmaDeferredPrompt) {
                // If user comes back to lobby, check again
                this.checkAndShowAuto();
            }
        };

        window.addEventListener('zigmaRouteChange', handleRouteProtection);
        window.addEventListener('popstate', handleRouteProtection);
    }

    private static isOnMainLobby(): boolean {
        const path = window.location.pathname;
        return path === '/' || path === '';
    }

    private static checkAndShowAuto() {
        // Rule 1: Never show if already installed
        const status = localStorage.getItem(this.STORAGE_KEY);
        if (status === 'installed') {
            console.log('[PWA] ⏭️ Already installed, skipping prompt.');
            return;
        }

        // Rule 2: Only show on main lobby
        if (!this.isOnMainLobby()) {
            console.log('[PWA] ⏭️ Not on main lobby, skipping prompt.');
            return;
        }

        // Rule 3: Check timing
        const now = Date.now();

        if (status === 'dismissed') {
            // If dismissed, check if 1 day has passed since dismiss
            const dismissTime = parseInt(localStorage.getItem(this.DISMISS_TIME_KEY) || '0', 10);
            if (now - dismissTime < this.DISMISS_COOLDOWN_MS) {
                console.log('[PWA] ⏭️ Dismissed recently, waiting for cooldown.');
                return;
            }
            // Cooldown passed, reset status so it can show again
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem(this.DISMISS_TIME_KEY);
        } else {
            // First visit delay: check if 10 hours have passed
            const firstVisit = parseInt(localStorage.getItem(this.FIRST_VISIT_KEY) || '0', 10);
            if (now - firstVisit < this.FIRST_VISIT_DELAY_MS) {
                console.log('[PWA] ⏭️ First visit delay not met yet.');
                return;
            }
        }

        // Show automatically after a short delay to not overwhelm the user
        setTimeout(() => {
            if ((window as any).zigmaDeferredPrompt && !this.isVisible && this.isOnMainLobby()) {
                this.show();
            }
        }, 2000);
    }

    static render() {
        let container = document.getElementById('install-prompt-ui');

        if (!container) {
            container = document.createElement('div');
            container.id = 'install-prompt-ui';
            // Repositioned to BOTTOM LEFT and matched with Zigma aesthetic
            container.className = 'fixed bottom-6 left-6 w-[90%] max-w-[320px] z-[9999] hidden pointer-events-auto transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)';
            document.body.appendChild(container);
        }

        const isArabic = i18n.getLanguage() === 'ar';

        container.innerHTML = `
            <div class="relative overflow-hidden bg-white border-4 border-[#6CC452] border-b-[10px] border-b-[#478D47] rounded-[28px] p-5 shadow-2xl group" ${isArabic ? 'dir="rtl"' : ''}>
                <!-- Background Decoration -->
                <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#2d5a30 1px, transparent 1px); background-size: 16px 16px;"></div>
                
                <!-- Close Button -->
                <button id="install-close-btn" class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-[#F1F8E9] text-[#478D47] border border-[#6CC452]/20 hover:bg-[#E8F5E9] transition-all z-20">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>

                <div class="relative z-10 flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <!-- Icon Box -->
                        <div class="w-12 h-12 bg-[#F1F8E9] border-2 border-[#478D47] rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform overflow-hidden">
                            <img src="/logo/Zigma-logo-fix.webp" alt="Zigma" class="w-10 h-10 object-contain" />
                        </div>
                        
                        <div class="flex flex-col gap-0.5">
                            <h3 class="text-[#478D47] font-['Retro_Gaming'] text-[11px] uppercase tracking-wider leading-tight">
                                ${i18n.t('lobby.install_modal.title')}
                            </h3>
                            <p class="text-[#478D47]/60 font-['Retro_Gaming'] text-[8px] leading-tight">
                                ${i18n.t('lobby.install_modal.desc')}
                            </p>
                        </div>
                    </div>

                    <div class="flex gap-2.5">
                        <!-- Confirm Button -->
                        <button id="install-confirm-btn" class="pixel-text-outline flex-[2] py-2 bg-[#336B23] text-white font-['Retro_Gaming'] text-[10px] uppercase rounded-lg border-b-4 border-[#1F4514] hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-[12px]">download</span>
                            <span>${i18n.t('lobby.install_modal.confirm')}</span>
                        </button>
                        
                        <!-- Later Button -->
                        <button id="install-later-btn" class="flex-1 py-2 bg-[#F1F8E9] text-[#478D47] font-['Retro_Gaming'] text-[10px] uppercase rounded-lg border-b-4 border-[#6CC452]/50 hover:bg-[#E8F5E9] active:border-b-0 active:translate-y-1 transition-all">
                            ${i18n.t('lobby.install_modal.cancel')}
                        </button>
                    </div>
                </div>
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
                el.style.transform = 'translate(0, 0)';
                el.style.opacity = '1';
                el.classList.add('translate-y-0');
            });
        }
    }

    static hide(dismiss: boolean = false) {
        this.isVisible = false;
        const el = document.getElementById('install-prompt-ui');
        if (el) {
            el.style.transform = 'translate(0, 50px)';
            el.style.opacity = '0';
            setTimeout(() => el.classList.add('hidden'), 500);
        }
        if (dismiss) {
            localStorage.setItem(this.STORAGE_KEY, 'dismissed');
            localStorage.setItem(this.DISMISS_TIME_KEY, Date.now().toString());
        }
    }
}
