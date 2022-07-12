/* eslint-disable comma-dangle */
import express, { Request, Response } from 'express';
import HeartbeatController from './components/heartbeat/controllers/heartbeat.controller';
import MovieController from './components/movie/controllers/movie.controller';
import TheatreController from './components/theatre/controllers/theatre.controller';

const app = express();
app.use(express.json());

app.get('/movies', async (req, res) => {
  const id: any = req.query.cityId;
  const movies = await new MovieController().getMovie(id);
  res.json(movies);
});

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatre);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
