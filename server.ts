import express from 'express';
import getHeartbeat from './components/heartbeat/Controllers/heartbeatController';

const app = express();
const PORT = 3000;

app.get('/heartbeat', getHeartbeat);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at port ${PORT}`);
});
