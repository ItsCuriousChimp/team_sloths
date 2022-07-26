import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from './src/middleware/auth.middleware';
import heartbeatRouter from './src/routers/heartbeat.route';
import accountsRouter from './src/routers/account.route';
import usersRouter from './src/routers/user.route';
import theatresRouter from './src/routers/theatre.route';
import moviesRouter from './src/routers/movie.route';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/heartbeat', heartbeatRouter);
app.use('/accounts', accountsRouter);
app.use('/user', usersRouter);
app.use('/theatres', theatresRouter);
app.use('/movies', moviesRouter);

app.get('/verify', new AuthMiddleware().verifyToken, (req: Request, res: Response) => {
  res.status(200).send('Welcome  🙌 ');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
