import express from 'express';
import { HeartbeatController } from './Components/Heartbeat/Controllers/heartbeat.controllers.js';

const app = express();

app.get('/heartbeat', (req, res) => {
  res.send(new HeartbeatController().getHeartbeat());
});
app.listen(3000, () => {});
