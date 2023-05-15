const crypto = require('crypto');
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

// Very legit database...
const scores = {};

function getRandomEnemyType() {
    const min = 0;
    const max = 7;
    return Math.floor(Math.random() * (max - min) + min);
}

function spawnEnemy(ws) {
    ws.send(`SPAWN_ENEMY:${getRandomEnemyType()}`);
    // Slowly get faster as the score increases
    nextEnemySpawn = setTimeout(() => spawnEnemy(ws), Math.max(2000 - scores[ws.id] * 20, 500));
}

wss.on('connection', function connection(ws) {
    console.log('New Connection');
    ws.id = crypto.randomUUID();
    scores[ws.id] = 0;

    let nextEnemySpawn;

    setTimeout(() => spawnEnemy(ws), 2000);

    ws.on('close', () => {
        clearTimeout(nextEnemySpawn);
        delete scores[ws.id];
        console.log('Disconnected');
    });

    ws.on('message', (buffer) => {
        const data = buffer.toString();
        if (data === 'INCREASE_SCORE') {
            scores[ws.id]++;
            ws.send(`RECIEVE_SCORE:${scores[ws.id]}`);
        }
    });
});
