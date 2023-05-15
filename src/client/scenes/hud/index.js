import Phaser from 'phaser';
import { eventBus, events } from '../../components/eventBus';
import { gameData } from '../../components/gameData';

export class HUD extends Phaser.Scene {
    constructor() {
        super({ key: 'hud', active: true });
    }

    score = 0;
    health = 3;

    preload() {}

    create() {
        this.scoreLabel = this.add.text(0, 0, `Score: 0`, { font: '50px Oswald' });
        this.healthLabel = this.add.text(gameData.WIDTH - 180, 0, `Health: 3`, { font: '50px Oswald' });

        eventBus.on(events.RECIEVE_SCORE, (value) => {
            this.score = value;
        });

        eventBus.on(events.LOOSE_HEALTH, () => {
            this.health -= 1;
            if (this.health <= 0) {
                eventBus.emit(events.GAME_OVER, { score: this.score });
            }
        });
    }

    update() {
        this.scoreLabel.setText(`Score: ${this.score}`);
        this.healthLabel.setText(`Health: ${this.health}`);
    }
}
