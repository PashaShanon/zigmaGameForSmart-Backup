import { LoginManager } from './scenes/login/page';
import { LobbyManager } from './scenes/lobby/page';
import { authService } from './services/auth/AuthService';
import { LoginUI } from './scenes/login/ui';
import { LobbyUI } from './scenes/lobby/ui';
import { CreateRoomUI } from './scenes/lobby/create-room-ui';
import { QuizSelectionUI } from './scenes/host/selectquiz/ui';
import { QuizSettingsUI } from './scenes/host/quizsetting/ui';
import { WaitingRoomUI } from './scenes/host/lobby/ui';
import { AuthLoadingUI } from './scenes/login/auth-loading-ui';
import { GameOverlayUI } from './scenes/player/game/ui';

import { TestLabManager } from './scenes/TestLabManager';
import { InstallPromptUI } from './ui/InstallPromptUI';

async function bootstrap() {
    // Pre-render all global UIs
    LoginUI.render();
    LobbyUI.render();
    CreateRoomUI.render();
    QuizSelectionUI.render();
    QuizSettingsUI.render();
    WaitingRoomUI.render();
    AuthLoadingUI.render();
    GameOverlayUI.render();
    InstallPromptUI.render();
    InstallPromptUI.init();

    const currentPath = window.location.pathname;

    // ROUTE KHUSUS: Laboratorium Eksperimen
    if (currentPath === '/tes-dasar') {
        const testLabManager = new TestLabManager();
        testLabManager.init();
        return;
    }

    if (currentPath === '/login' || currentPath.startsWith('/login')) {
        const loginManager = new LoginManager();
        loginManager.init();
        return;
    }

    const authOverlay = document.getElementById('auth-loading-overlay');
    if (authOverlay) {
        authOverlay.classList.remove('hidden');
    }

    const isAuth = await authService.isAuthenticated();

    if (!isAuth) {
        const loginManager = new LoginManager();
        await loginManager.init();
        if (authOverlay) authOverlay.classList.add('hidden');
    } else {
        const lobbyManager = new LobbyManager();
        await lobbyManager.init();
        if (authOverlay) authOverlay.classList.add('hidden');
    }
}

// --- GLOBAL FULLSCREEN LOGIC ---
const updateFullscreenButtonState = () => {
    const fsBtn = document.getElementById('global-fullscreen-btn');
    if (!fsBtn) return;

    const path = window.location.pathname;

    // Player pages: starts with /player, or exactly /game, or starts with /join
    const isPlayerPage = path.startsWith('/player') || path === '/game' || path.startsWith('/join');
    // Monitoring page: /host/progress
    const isMonitoringPage = path === '/host/progress';

    if (isPlayerPage) {
        fsBtn.classList.add('hidden');
    } else {
        fsBtn.classList.remove('hidden');
        if (isMonitoringPage) {
            fsBtn.classList.remove('right-4', 'md:right-6', '!left-auto');
            fsBtn.classList.add('left-16', 'md:left-20');
        } else {
            fsBtn.classList.remove('left-16', 'md:left-20');
            fsBtn.classList.add('right-4', 'md:right-6', '!left-auto');
        }
    }
};

const setupGlobalFullscreen = () => {
    const fsBtn = document.getElementById('global-fullscreen-btn');
    const fsIcon = document.getElementById('global-fullscreen-icon');

    if (fsBtn && fsIcon) {
        fsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const doc = document as any;
            const docEl = document.documentElement as any;

            if (!doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement) {
                if (docEl.requestFullscreen) docEl.requestFullscreen().catch((err: any) => console.error("Fullscreen error:", err));
                else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
                else if (docEl.mozRequestFullScreen) docEl.mozRequestFullScreen();
                else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
            } else {
                if (doc.exitFullscreen) doc.exitFullscreen();
                else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
                else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
                else if (doc.msExitFullscreen) doc.msExitFullscreen();
            }
        });

        const updateFsIcon = () => {
            const isFS = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement);
            fsIcon.textContent = isFS ? 'fullscreen_exit' : 'fullscreen';
        };

        ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(event => {
            document.addEventListener(event, updateFsIcon);
        });

        // Initialize state and route change listeners
        updateFullscreenButtonState();
        window.addEventListener('zigmaRouteChange', updateFullscreenButtonState);
        window.addEventListener('popstate', updateFullscreenButtonState);
    }
};

bootstrap();
setupGlobalFullscreen();


