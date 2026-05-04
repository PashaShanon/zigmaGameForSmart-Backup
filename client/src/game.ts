import Phaser from 'phaser';
import { HostWaitingRoomScene } from './scenes/host/lobby/page';
import { GameScene } from './scenes/player/game/page';
import { UIScene } from './scenes/player/ui/page';


import { HostProgressScene } from './scenes/host/progress/page';

import { LoginUI } from './scenes/login/ui';
import { LobbyUI } from './scenes/lobby/ui';
import { CreateRoomUI } from './scenes/lobby/create-room-ui';
import { QuizSelectionUI } from './scenes/host/selectquiz/ui';
import { QuizSettingsUI } from './scenes/host/quizsetting/ui';
import { WaitingRoomUI } from './scenes/host/lobby/ui';
import { AuthLoadingUI } from './scenes/login/auth-loading-ui';
import { GameOverlayUI } from './scenes/player/game/ui';
import { InstallPromptUI } from './ui/InstallPromptUI';

// Pre-render all global UIs to replace the ones removed from index.html
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

import { AudioManager } from './systems/AudioManager';

class BootScene extends Phaser.Scene {
    constructor() { super('BootScene'); }

    preload() {
        AudioManager.getInstance().preload(this);
    }

    create() {
        // Initialize AudioManager with this scene context so it can play sounds
        AudioManager.getInstance().init(this);
        
        // Once preloaded, we can initialize and play main BGM if we are in lobby context
        // But scenes are usually started via initializeGame()
    }
}

export function initializeGame(startScene?: string, sceneData?: any) {
    if ((window as any).gameInstance) {
        console.log('Game already initialized');
        // If engine already running, just start the scene
        if (startScene) {
            (window as any).gameInstance.scene.start(startScene, sceneData);
        }
        return;
    }

    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        pixelArt: true,
        roundPixels: true,
        antialias: false,
        antialiasGL: false,
        render: {
            pixelArt: true,
            antialias: false,
            roundPixels: true,
            powerPreference: 'high-performance',
            batchSize: 2000
        },
        width: '100%',
        height: '100%',
        parent: 'app',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { x: 0, y: 0 },
                debug: false
            }
        },
        scene: [
            BootScene,
            HostWaitingRoomScene,
            GameScene,
            UIScene,
            HostProgressScene
        ],
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            expandParent: true
        },
        dom: {
            createContainer: true
        },
        callbacks: {
            postBoot: (game: Phaser.Game) => {
                if (startScene) {
                    game.scene.start(startScene, sceneData);
                }
            }
        }
    };

    (window as any).gameInstance = new Phaser.Game(config);
}
