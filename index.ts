import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import TheatreController from './src/controllers/theatre.controller';
import HeartbeatController from './src/controllers/heartbeat.controller';
import MovieController from './src/controllers/movie.controller';
import BookedSeatController from './src/controllers/booked-seat.controller';
import AccountController from './src/controllers/account.controller';
import AuthMiddleware from './src/middleware/auth.middleware';
import UserController from './src/controllers/user.controller';
import mapper from './src/common/mappings/mapper';
import AutomapperPayloadConfig from './src/controllers/payloads/mapper.config';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
AutomapperPayloadConfig.init(mapper);

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

app.get('/verify', new AuthMiddleware().verifyToken, (req: Request, res: Response) => {
  res.status(200).send('Welcome 🙌 ');
});

app.get('/user/profile', new AuthMiddleware().verifyToken, new UserController().getUserDetails);

app.put('/user/profile', new AuthMiddleware().verifyToken, new UserController().updateUserDetails);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
