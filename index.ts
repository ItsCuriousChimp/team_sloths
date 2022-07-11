import express, { Request, Response } from 'express';
import TheatreController from './components/theatre/controllers/theatre.controller';
import HeartbeatController from './components/heartbeat/controllers/heartbeat.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatre);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
