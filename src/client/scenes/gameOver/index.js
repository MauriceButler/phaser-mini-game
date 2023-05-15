import Phaser from 'phaser';
import { gameData } from '../../components/gameData';

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameOver' });
    }

    preload() {}

    create({ score }) {
        this.add
            .text(gameData.WIDTH / 2, gameData.HEIGHT / 3, `GAME OVER`, {
                font: '50px Oswald',
            })
            .setOrigin(0.5);

        this.add
            .text(gameData.WIDTH / 2, (gameData.HEIGHT / 3) * 2, `Score: ${score}`, {
                font: '50px Oswald',
            })
            .setOrigin(0.5);
    }

    update() {}
}
