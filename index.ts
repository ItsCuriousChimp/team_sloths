/* eslint-disable import/first */
require('express-async-errors');

import express from 'express';
import bodyParser from 'body-parser';
import heartbeatRoute from './src/routes/heartbeat.route';
import theatreRoute from './src/routes/theatre.route';
import movieRoute from './src/routes/movie.route';
import accountRoute from './src/routes/account.route';
import userRoute from './src/routes/user.route';
import showRoute from './src/routes/show.route';
import AutomapperPayloadConfig from './src/controllers/payloads/automapper.config';
import mapper from './src/common/mapper';
import ErrorHandlerMiddleware from './src/middleware/errorHandler.middleware';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AutomapperPayloadConfig.init(mapper);
app.use('/heartbeat', heartbeatRoute);
app.use('/theatres', theatreRoute);
app.use('/movies', movieRoute);
app.use('/accounts', accountRoute);
app.use('/users', userRoute);
app.use('/shows', showRoute);
app.use(new ErrorHandlerMiddleware().handleError);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000');
});
