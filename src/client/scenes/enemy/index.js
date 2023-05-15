import Phaser from 'phaser';
import enemies from '../../assets/sprites/enemies-sheet.png';
import { gameData } from '../../components/gameData';
import { eventBus, events } from '../../components/eventBus';

export class Enemy extends Phaser.Scene {
    constructor() {
        super({});
    }

    type = 0;

    preload() {
        this.load.spritesheet('enemies', enemies, { frameWidth: 128, frameHeight: 128 });
    }

    create({ enemyType }) {
        this.type = enemyType;
        this.enemy = this.physics.add.sprite(gameData.WIDTH + 256, gameData.HEIGHT, 'enemies');
        this.enemy.setCollideWorldBounds(true);
        const smallBounds = new Phaser.Geom.Rectangle(-128, 0, gameData.WIDTH + 256, gameData.HEIGHT);
        this.enemy.body.customBoundsRectangle = smallBounds;

        this.enemy.setSize(91, 64);
        this.enemy.setOffset(16, 64);

        this.anims.create({
            key: `enemy-${this.type}-walk`,
            frames: this.anims.generateFrameNumbers('enemies', { start: enemyType * 2, end: enemyType * 2 + 1 }),
            frameRate: 5,
            repeat: -1,
        });

        this.physics.add.overlap(this.enemy, this.scene.get('player').player, () => {
            eventBus.emit(events.TAKE_DAMAGE);
        });

        eventBus.on(events.GAME_OVER, () => {
            this.enemy.visible = false;
        });
    }

    update() {
        this.enemy.setVelocityX(-gameData.ENEMY_SPEED);
        this.enemy.anims.play(`enemy-${this.type}-walk`, true);

        if (this.enemy.x < 0) {
            eventBus.emit(events.INCREASE_SCORE);
            this.scene.remove(this);
        }
    }
}
