export const events = {
    SPAWN_ENEMY: 'SPAWN_ENEMY',
    TAKE_DAMAGE: 'TAKE_DAMAGE',
    LOOSE_HEALTH: 'LOOSE_HEALTH',
    INCREASE_SCORE: 'INCREASE_SCORE',
    GET_SCORE: 'GET_SCORE',
    RECIEVE_SCORE: 'RECIEVE_SCORE',
    GAME_OVER: 'GAME_OVER',
};

export const eventBus = new Phaser.Events.EventEmitter();
