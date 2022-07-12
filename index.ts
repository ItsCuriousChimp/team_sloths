/* eslint-disable comma-dangle */
import express from 'express';
import HeartbeatController from './components/heartbeat/controllers/heartbeat.controller';
import MovieController from './components/movie/controllers/movie.controller';

const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/heartbeat', (req, res) => {
  res.send(new HeartbeatController().getHeartbeat());
});
app.get('/movies', async (req, res) => {
  const id: any = req.query.cityId;
  const movies = await new MovieController().getMovie(id);
  res.json(movies);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at port ${PORT}`);
});
