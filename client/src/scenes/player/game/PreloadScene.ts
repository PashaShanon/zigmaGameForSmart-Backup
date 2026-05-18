import Phaser from 'phaser';
import { Room } from 'colyseus.js';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    init(data: { room: Room }) {
        this.registry.set('room', data.room);
    }

    preload() {
        const room = this.registry.get('room') as Room;
        if (!room) return;

        const difficulty = room.state.difficulty || 'mudah';
        let mapFile = 'map_newest_easy_nomor1.tmj';

        if (difficulty === 'sedang') {
            mapFile = 'map_medium.tmj';
        } else if (difficulty === 'sulit') {
            mapFile = 'map_hard.tmj';
        }

        // const cb = `?v=${Date.now()}`;
        console.log(`[PreloadScene] Background preloading assets for difficulty: ${difficulty}`);
        
        // Map
        const mapKey = difficulty === 'mudah' ? 'map_easy' : (difficulty === 'sedang' ? 'map_medium' : 'map_hard');
        this.load.tilemapTiledJSON(mapKey, `/assets/maps/${mapFile}`);
        
        // Tilesets
        this.load.image('tiles', `/assets/tileset/spr_tileset_sunnysideworld_16px.png`);
        this.load.image('forest_tiles', `/assets/tileset/spr_tileset_sunnysideworld_forest_32px.png`);
        this.load.image('coracle_tiles', `/assets/elements/spr_deco_coracle_strip4.png`);
        this.load.image('windmill_tiles', `/assets/elements/spr_deco_windmill_withshadow_strip9.png`);
        
        // Characters
        const humanPath = '/assets/characters/Human';
        this.load.spritesheet('character', `${humanPath}/WALKING/base_walk_strip8.png`, { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('base_idle', `${humanPath}/IDLE/base_idle_strip9.png`, { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('base_attack', `${humanPath}/ATTACK/base_attack_strip10.png`, { frameWidth: 96, frameHeight: 64 });
        
        this.load.spritesheet('tools_walk', `${humanPath}/WALKING/tools_walk_strip8.png`, { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('tools_idle', `${humanPath}/IDLE/tools_idle_strip9.png`, { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('tools_attack', `${humanPath}/ATTACK/tools_attack_strip10.png`, { frameWidth: 96, frameHeight: 64 });
        
        const hairKeys = ['bowlhair', 'curlyhair', 'longhair', 'mophair', 'shorthair', 'spikeyhair'];
        hairKeys.forEach(key => {
            this.load.spritesheet(`${key}_walk`, `${humanPath}/WALKING/${key}_walk_strip8.png`, { frameWidth: 96, frameHeight: 64 });
            this.load.spritesheet(`${key}_idle`, `${humanPath}/IDLE/${key}_idle_strip9.png`, { frameWidth: 96, frameHeight: 64 });
            this.load.spritesheet(`${key}_attack`, `${humanPath}/ATTACK/${key}_attack_strip10.png`, { frameWidth: 96, frameHeight: 64 });
        });

        // Skeleton & Goblin
        this.load.spritesheet('skeleton_idle', '/assets/characters/Skeleton/PNG/skeleton_idle_strip6.png', { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('skeleton_walk', '/assets/characters/Skeleton/PNG/skeleton_walk_strip8.png', { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('skeleton_death', '/assets/characters/Skeleton/PNG/skeleton_death_strip10.png', { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('goblin_idle', '/assets/characters/Goblin/PNG/spr_idle_strip9.png', { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('goblin_walk', '/assets/characters/Goblin/PNG/spr_walk_strip8.png', { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('goblin_death', '/assets/characters/Goblin/PNG/spr_death_strip13.png', { frameWidth: 96, frameHeight: 64 });

        // Others
        this.load.spritesheet('chest_tiles', '/assets/tileset/spr_tileset_sunnysideworld_16px.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('label_left', '/assets/label_left.png');
        this.load.image('label_middle', '/assets/label_middle.png');
        this.load.image('label_right', '/assets/label_right.png');
        this.load.image('select_dots', '/assets/select_dots.png');
        this.load.image('expression_alerted', '/assets/expression_alerted.png');
        this.load.image('expression_working', '/assets/elements/expression_working.png');
    }

    create() {
        console.log("[PreloadScene] Assets preloaded and cached.");
        // We don't stop the scene, we just leave it in the background or stop it manually
        // But stopping it is better to free resources. The cache persists.
        this.scene.stop();
    }
}
