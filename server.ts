import express from 'express';
import { HeartbeatController } from './components/heartbeat/controllers/heartbeat.controller';

const app = express();
const PORT = 3000;

app.get('/heartbeat', new HeartbeatController().getHeartbeat);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at port ${PORT}`);
});
