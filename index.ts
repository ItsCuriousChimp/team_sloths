import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import TheatreController from './src/controllers/theatre.controller';
import HeartbeatController from './src/controllers/heartbeat.controller';
import MovieController from './src/controllers/movie.controller';
import BookedSeatController from './src/controllers/booked-seat.controller';
import AccountController from './src/controllers/account.controller';

const auth = require('./src/middleware/auth');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/heartbeat', (req: Request, res: Response) => {
  res.send(new HeartbeatController().getHeartbeat());
});

app.get('/theatres', new TheatreController().getTheatresByCityId);

app.get('/movies', new MovieController().getMovieByCityId);

app.get('/theatres/:theatreId/movies', new MovieController().getMoviesByTheatreId);

app.get('/theatres/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);

app.get('/shows', new BookedSeatController().getBookedSeatsByMovieId);

app.post('/accounts/signup', new AccountController().signUpUserUsingEmailAndPassword);

app.get('/accounts/login', new AccountController().loginUsingEmailAndPassword);

app.get('/verify', auth, (req: Request, res: Response) => {
  res.status(200).send('Welcome 🙌 ');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
