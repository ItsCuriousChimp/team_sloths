import express from 'express';
import MovieController from '../controllers/movie.controller';
import TheatreController from '../controllers/theatre.controller';

const router = express.Router();

router.get('/', new TheatreController().getTheatresByCityId);
router.get('/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);
router.get('/:theatreId/movies', new MovieController().getMoviesByTheatreId);

export default router;
