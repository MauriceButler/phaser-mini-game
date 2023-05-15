import Phaser from 'phaser';
import { Splash } from './scenes/splash';
import { gameData } from './components/gameData';

const config = {
    type: Phaser.AUTO,
    width: gameData.WIDTH,
    height: gameData.HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: gameData.GRAVITY },
        },
    },
    scene: Splash,
};

const game = new Phaser.Game(config);
