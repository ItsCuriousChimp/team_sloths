import express from 'express';
import TheatreController from '../controllers/theatre.controller';
import BookedSeatController from '../controllers/booked-seat.controller';
import MovieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/', new TheatreController().getTheatresByCityId);

router.get('/:theatreId/movies', new MovieController().getMoviesByTheatreId);

router.get(
  '/:theatresId/shows',
  new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId,
);

router.get(
  '/shows/:showId',
  new BookedSeatController().getBookedSeatsByMovieId,
);

export default router;
