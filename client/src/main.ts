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

    const isAuth = await authService.isAuthenticated();

    if (!isAuth) {
        const loginManager = new LoginManager();
        loginManager.init();
    } else {
        const lobbyManager = new LobbyManager();
        lobbyManager.init();
    }
}

// --- GLOBAL FULLSCREEN LOGIC ---
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
    }
};

bootstrap();
setupGlobalFullscreen();

