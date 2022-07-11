import express, { Request, Response } from 'express';
import TheatreController from './components/theatre/controllers/theatre.controller';
import HeartbeatController from './components/heartbeat/controllers/heartbeat.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', async (req: Request, res: Response) => {
  const { cityId } = req.query;
  const theatreList = await new TheatreController().getTheatre(String(cityId));
  res.json(theatreList);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
