import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/routes/users.routes';
import accountRouter from './src/routes/accounts.routes';
import heartbeatRouter from './src/routes/heartbeat.routes';
import theatreRouter from './src/routes/theatres.routes';
import moviesRouter from './src/routes/movies.routes';
import showsRouter from './src/routes/shows.routes';
import AutomapperPayloadConfig from './src/controllers/payloads/automapper.config.ts';
import mapper from './src/common/mapper';

const app = express();
new AutomapperPayloadConfig().init(mapper);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/accounts', accountRouter);
app.use('/heartbeat', heartbeatRouter);
app.use('/theatres', theatreRouter);
app.use('/movies', moviesRouter);
app.use('/shows', showsRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
