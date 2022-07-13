/* eslint-disable comma-dangle */
import express, { Request, Response } from 'express';
import HeartbeatController from './controllers/heartbeat.controller';
import MovieController from './controllers/movie.controller';
import TheatreController from './controllers/theatre.controller';

const app = express();
app.use(express.json());

app.get('/movies', new MovieController().getMovieByCityId);

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatre);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
