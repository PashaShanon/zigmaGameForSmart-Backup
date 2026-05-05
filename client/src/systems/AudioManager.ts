import Phaser from 'phaser';

/**
 * AudioManager System
 * Handles global BGM and SFX playback, volume control, and persistence.
 */
export class AudioManager {
    private static instance: AudioManager;
    private scene!: Phaser.Scene;
    private bgm: { [key: string]: Phaser.Sound.BaseSound } = {};
    private sfx: { [key: string]: Phaser.Sound.BaseSound } = {};
    
    private currentBgmKey: string | null = null;
    private pendingBgmKey: string | null = null;
    private loadedKeys: Set<string> = new Set();
    private isMuted: boolean = true;
    private isRoomMuted: boolean = false; // New flag for room-wide music control
    private bgmVolume: number = 0.5;
    private sfxVolume: number = 0.7;
    private countdownSound: Phaser.Sound.BaseSound | null = null;

    private constructor() {
        // Load settings from localStorage
        const savedMute = localStorage.getItem('audio_muted');
        if (savedMute !== null) {
            this.isMuted = savedMute === 'true';
        } else {
            this.isMuted = true; // Default music off
        }
        
        const savedBgmVol = localStorage.getItem('audio_bgm_vol');
        if (savedBgmVol) this.bgmVolume = parseFloat(savedBgmVol);

        const savedSfxVol = localStorage.getItem('audio_sfx_vol');
        if (savedSfxVol) this.sfxVolume = parseFloat(savedSfxVol);
    }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    /** Initialize with a scene context (needed for Phaser Sound Manager) */
    public init(scene: Phaser.Scene) {
        this.scene = scene;
        console.log("[AudioManager] Initialized with scene context.");

        // If there was a pending BGM request before init, it will be handled when loading finishes
        // or if it's already loaded.
        if (this.pendingBgmKey && this.loadedKeys.has(this.pendingBgmKey)) {
            const key = this.pendingBgmKey;
            this.pendingBgmKey = null;
            this.playBGM(key);
        }
    }

    /** Global Preload helper to be called in a Boot or Preload scene */
    public preload(scene: Phaser.Scene) {
        this.scene = scene;
        
        // Track loading status
        this.scene.load.on('filecomplete-audio-bgm_main', () => {
            console.log("[AudioManager] ✅ bgm_main loaded");
            this.loadedKeys.add('bgm_main');
            if (this.pendingBgmKey === 'bgm_main') {
                this.pendingBgmKey = null;
                this.playBGM('bgm_main');
            }
        });
        
        this.scene.load.on('filecomplete-audio-bgm_game', () => {
            console.log("[AudioManager] ✅ bgm_game loaded");
            this.loadedKeys.add('bgm_game');
            if (this.pendingBgmKey === 'bgm_game') {
                this.pendingBgmKey = null;
                this.playBGM('bgm_game');
            }
        });

        this.scene.load.on('loaderror', (file: any) => {
            console.error(`[AudioManager] ❌ Error loading: ${file.key}`, file.src);
        });

        // --- BGM ---
        this.scene.load.audio('bgm_main', '/assets/audio/bgm/djartmusic-i-love-my-8-bit-game-console-301272.mp3');
        this.scene.load.audio('bgm_game', '/assets/audio/bgm/djartmusic-best-game-console-301284.mp3');
        
        // --- SFX ---
        this.scene.load.audio('sfx_countdown', '/assets/audio/sfx/u_0s8f57wh1h-contador-385321.mp3');
    }

    /** Play Background Music */
    public playBGM(key: string, loop: boolean = true) {
        if (!this.scene || !this.loadedKeys.has(key)) {
            console.log(`[AudioManager] ⏳ ${key} not ready (Scene: ${!!this.scene}, Loaded: ${this.loadedKeys.has(key)}), queuing...`);
            this.pendingBgmKey = key;
            return;
        }
        
        // Stop current BGM if different (with fade out)
        if (this.currentBgmKey && this.currentBgmKey !== key) {
            console.log(`[AudioManager] 🛑 Fading out current BGM: ${this.currentBgmKey}`);
            const oldMusic = this.bgm[this.currentBgmKey];
            if (oldMusic && oldMusic.isPlaying) {
                this.scene.tweens.add({
                    targets: oldMusic,
                    volume: 0,
                    duration: 800,
                    onComplete: () => {
                        oldMusic.stop();
                    }
                });
            } else if (oldMusic) {
                oldMusic.stop();
            }
        }

        if (this.currentBgmKey === key && this.bgm[key]?.isPlaying) return;

        this.currentBgmKey = key;
        console.log(`[AudioManager] 🎵 Attempting to play BGM: ${key} (Muted: ${this.isMuted})`);
        
        try {
            // Check if already added to sound manager
            let music = this.bgm[key];
            if (!music) {
                music = this.scene.sound.add(key, { loop, volume: 0 });
                this.bgm[key] = music;
            }

            if (!this.isMuted && !this.isRoomMuted) {
                if (!music.isPlaying) {
                    (music as any).setVolume(0);
                    music.play();
                    console.log(`[AudioManager] ▶️ Fading in: ${key}`);
                }
                
                // Always tween volume up
                this.scene.tweens.add({
                    targets: music,
                    volume: this.bgmVolume,
                    duration: 800
                });
            } else {
                console.log(`[AudioManager] 🔇 Music is muted (Personal: ${this.isMuted}, Room: ${this.isRoomMuted}), ${key} prepared but not played.`);
            }
        } catch (e) {
            console.warn(`[AudioManager] ❌ Failed to play BGM: ${key}`, e);
        }
    }

    /** Stop Current Background Music */
    public stopBGM() {
        if (this.currentBgmKey && this.bgm[this.currentBgmKey]) {
            const music = this.bgm[this.currentBgmKey];
            if (music.isPlaying) {
                this.scene.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 800,
                    onComplete: () => {
                        music.stop();
                    }
                });
            } else {
                music.stop();
            }
            this.currentBgmKey = null;
        }
    }

    /** Play Sound Effect */
    public playSFX(key: string) {
        if (!this.scene || this.isMuted || this.isRoomMuted) return;
        
        try {
            this.scene.sound.play(key, { volume: this.sfxVolume });
        } catch (e) {
            console.warn(`[AudioManager] ❌ Failed to play SFX: ${key}`, e);
        }
    }

    /** Set room-wide mute status (e.g. from Host Settings) */
    public setRoomMute(muted: boolean) {
        this.isRoomMuted = muted;
        console.log(`[AudioManager] 🏠 Room mute set to: ${muted}`);
        
        if (this.isRoomMuted) {
            // Fade out BGM
            if (this.currentBgmKey && this.bgm[this.currentBgmKey] && this.bgm[this.currentBgmKey].isPlaying) {
                const music = this.bgm[this.currentBgmKey];
                this.scene.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 800,
                    onComplete: () => {
                        if (this.isRoomMuted) music.pause();
                    }
                });
            }
            this.stopCountdownSFX();
        } else if (!this.isMuted) {
            // Fade in BGM
            if (this.currentBgmKey && this.bgm[this.currentBgmKey]) {
                const music = this.bgm[this.currentBgmKey];
                if (!music.isPlaying) {
                    (music as any).setVolume(0);
                    music.play();
                } else if (music.isPaused) {
                    music.resume();
                }
                
                this.scene.tweens.add({
                    targets: music,
                    volume: this.bgmVolume,
                    duration: 800
                });
            }
        }
    }

    /** Specialized play for Countdown SFX (Ensures only 1 instance plays) */
    public playCountdownSFX() {
        if (!this.scene || this.isMuted || this.isRoomMuted) return;
        
        // Prevent double playing
        if (this.countdownSound && this.countdownSound.isPlaying) return;

        try {
            this.countdownSound = this.scene.sound.add('sfx_countdown', { volume: this.sfxVolume });
            this.countdownSound.play();
            console.log("[AudioManager] ⏰ Starting countdown sequence sound");
            
            this.countdownSound.once('complete', () => {
                this.countdownSound = null;
            });
        } catch (e) {
            console.warn(`[AudioManager] ❌ Failed to play countdown SFX`, e);
        }
    }

    /** Stop Countdown SFX specifically */
    public stopCountdownSFX() {
        if (this.countdownSound) {
            if (this.countdownSound.isPlaying) {
                this.countdownSound.stop();
                console.log("[AudioManager] ⏹️ Countdown sound stopped");
            }
            this.countdownSound = null;
        }
    }

    /** Toggle Global Mute */
    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        localStorage.setItem('audio_muted', String(this.isMuted));
        
        if (this.isMuted) {
            // Fade out BGM
            if (this.currentBgmKey && this.bgm[this.currentBgmKey] && this.bgm[this.currentBgmKey].isPlaying) {
                const music = this.bgm[this.currentBgmKey];
                this.scene.tweens.add({
                    targets: music,
                    volume: 0,
                    duration: 800,
                    onComplete: () => {
                        if (this.isMuted) music.pause();
                    }
                });
            }
        } else {
            // Fade in BGM
            if (this.currentBgmKey && this.bgm[this.currentBgmKey]) {
                const music = this.bgm[this.currentBgmKey];
                if (!music.isPlaying) {
                    (music as any).setVolume(0);
                    music.play();
                } else if (music.isPaused) {
                    music.resume();
                }
                
                this.scene.tweens.add({
                    targets: music,
                    volume: this.bgmVolume,
                    duration: 800
                });
            }
        }
        
        return this.isMuted;
    }

    public getMuteStatus(): boolean {
        return this.isMuted;
    }

    public setBGMVolume(volume: number) {
        this.bgmVolume = Phaser.Math.Clamp(volume, 0, 1);
        localStorage.setItem('audio_bgm_vol', String(this.bgmVolume));
        if (this.currentBgmKey && this.bgm[this.currentBgmKey]) {
            (this.bgm[this.currentBgmKey] as any).setVolume(this.bgmVolume);
        }
    }
}
