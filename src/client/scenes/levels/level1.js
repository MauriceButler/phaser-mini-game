import Phaser from 'phaser';
import { Connection } from '../connection';
import { Player } from '../player';
import { Enemy } from '../enemy';
import { HUD } from '../hud';
import { GameOver } from '../gameOver';
import { eventBus, events } from '../../components/eventBus';

export class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
    }

    preload() {
        this.scene.add('connection', Connection);
        this.scene.add('player', Player);
        this.scene.add('hud', HUD);
    }

    create() {
        eventBus.on(events.SPAWN_ENEMY, (data) => {
            const enemyKey = `enemy-${Date.now()}`;
            this.scene.add(enemyKey, Enemy);
            this.scene.start(enemyKey, { enemyType: Number(data) });
        });

        eventBus.on(events.GAME_OVER, (data) => {
            this.scene.add('gameOver', GameOver);
            this.scene.start('gameOver', data);
            this.scene.remove(this);
            this.scene.remove('hud');
            this.scene.remove('player');
        });
    }

    update() {}
}
