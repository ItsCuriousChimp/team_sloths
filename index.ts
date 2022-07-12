import express, { Request, Response } from 'express';
import TheatreController from './components/theatre/controllers/theatre.controller';
import HeartbeatController from './components/heartbeat/controllers/heartbeat.controller';
import MoviesController from './components/movie/controller/movie.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatre);

app.get('/theatres/:theatreId/movies', new MoviesController().getMovie);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
