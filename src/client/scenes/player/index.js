import Phaser from 'phaser';
import alien from '../../assets/sprites/alienBlue-sheet.png';
import { gameData } from '../../components/gameData';
import { eventBus, events } from '../../components/eventBus';

export class Player extends Phaser.Scene {
    constructor() {
        super({ key: 'player', active: true });
    }

    invincible = false;
    preload() {
        this.load.spritesheet('alien', alien, { frameWidth: 128, frameHeight: 256 });
    }

    create() {
        this.player = this.physics.add.sprite(100, 450, 'alien');
        this.player.setCollideWorldBounds(true);

        this.player.setSize(91, 128);
        this.player.setOffset(16, 128);

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'alien', frame: 0 }],
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('alien', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });

        eventBus.on(events.TAKE_DAMAGE, () => {
            if (!this.invincible) {
                this.invincible = true;

                this.invincibleInterval = setInterval(() => {
                    if (!this.player.isTinted) {
                        this.player.setTint(0xff0000);
                    } else {
                        this.player.setTint(0xffffff);
                    }
                }, gameData.INVINIBILITY_FLICKER);

                eventBus.emit(events.LOOSE_HEALTH);

                setTimeout(() => {
                    clearInterval(this.invincibleInterval);
                    this.invincible = false;
                    this.player.setTint(0xffffff);
                }, gameData.INVINIBILITY_TIME);
            }
        });
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.player.flipX = true;
            this.player.setVelocityX(-gameData.PLAYER_SPEED);
            this.player.anims.play('walk', true);
        } else if (cursors.right.isDown) {
            this.player.flipX = false;
            this.player.setVelocityX(gameData.PLAYER_SPEED);
            this.player.anims.play('walk', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
        }

        if (cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(gameData.JUMP_VELOCITY);
        }
    }
}
