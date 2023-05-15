import Phaser from 'phaser';
import { eventBus, events } from '../../components/eventBus';

export class Connection extends Phaser.Scene {
    constructor() {
        super({ key: 'connection', active: true });
    }

    preload() {}

    create() {
        let socket = new WebSocket('ws://localhost:8080');

        socket.onopen = function (e) {
            console.log('Successfull Connection');
        };

        socket.onmessage = function (event) {
            const [eventName, data] = event.data.split(':');
            eventBus.emit(events[eventName], data);
        };

        eventBus.on(events.INCREASE_SCORE, () => {
            socket.send(events.INCREASE_SCORE);
        });

        eventBus.on(events.GAME_OVER, () => {
            socket.close();
        });
    }

    update() {}
}
