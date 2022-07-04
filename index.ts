import express from 'express';
import { HeartBeatController } from './Components/Heartbeat/Controllers/heartbeat.controllers.js';

const app = express();

app.get('/heartbeat', (req, res) => {
  res.send(new HeartBeatController().getHeartbeat());
});
app.listen(3000, () => {});
