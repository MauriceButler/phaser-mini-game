import Phaser from 'phaser';
import logo from '../../assets/logo-transparent.png';
import { gameData } from '../../components/gameData';
import { Level1 } from '../levels/level1';

export class Splash extends Phaser.Scene {
    constructor() {
        super({ key: 'splash' });
    }

    preload() {
        this.load.image('logo', logo);
    }

    create() {
        const image = this.add.image(gameData.WIDTH / 2, gameData.HEIGHT / 2, 'logo');
        image.setScale(0.5, 0.5);

        this.scene.add('level1', Level1);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        setTimeout(() => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        }, 3000);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('level1');
        });
    }

    update() {}
}
