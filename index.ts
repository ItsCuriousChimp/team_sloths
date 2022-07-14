import express, { Request, Response } from 'express';
import TheatreController from './controllers/theatre.controller';
import HeartbeatController from './controllers/heartbeat.controller';
import MovieController from './controllers/movie.controller';

const app = express();
app.use(express.json());

app.get('/heartbeat', (_req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

// app.get('/theatres', new TheatreController().getTheatresByCityId);

app.get('/movies', new MovieController().getMovieByCityId);

app.get('/theatres/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);
app.get('/theatres/:theatresId/movies', new MovieController().getMoviesByTheatreId);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
