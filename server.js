const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = ['https://agreeable-beach-0cb423010.5.azurestaticapps.net'];

app.use(cors({ 
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
}));

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getDiceFace(diceValue) {
    const faces = [
        {x: 0, y: 0},
        {x: 90, y: 0},
        {x: 0, y: -90},
        {x: 0, y: 90},
        {x: -90, y: 0},
        {x: 180, y: 0}
    ];
    return faces[diceValue - 1];
}

app.get('/', (req, res) => {
    res.status(200).send('Server Dice Roller API');
});

app.get('/roll-dice', (req, res) => {
    const die1 = rollDice();
    const die2 = rollDice();

    const face1 = getDiceFace(die1);
    const face2 = getDiceFace(die2);

    res.json({ 
        die1,
        die2,
        face1,
        face2
    });
});

app.get('/roll-dice-fail', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ message: 'CORS should fail here!' });
});

app.get('/api/ping', (req, res) => {
    res.send('pong');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server running...');
});