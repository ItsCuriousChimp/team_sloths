import express from 'express';
import bodyParser from 'body-parser';
import heartbeat from './src/routes/heartbeat.route';
import movies from './src/routes/movie.route';
import users from './src/routes/user.route';
import accounts from './src/routes/account.route';
import theatres from './src/routes/theatre.route';
import shows from './src/routes/show.route';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/heartbeat', heartbeat);
app.use('/theatres', theatres);
app.use('/movies', movies);
app.use('/accounts', accounts);
app.use('/user', users);
app.use('/shows', shows);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
