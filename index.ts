import express from 'express';
import HeartbeatController from './components/heartbeat/controllers/heartbeat.controller';

const app = express();
const PORT = 3000;

// GET /heartbeat
app.get('/heartbeat', (req, res) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at port ${PORT}`);
});
