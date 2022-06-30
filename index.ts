const heartBeatControllers = require('./components/heartbeat/controllers/heartBeatControllers.ts');

const express = require('express');
const app = express();

app.get('/heartbeat', heartBeatControllers.getHeartBeat);

app.listen(3000, () => {});
