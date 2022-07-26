import express from 'express';
import MovieController from '../controllers/movie.controller';
import TheatreController from '../controllers/theatre.controller';

const router = express.Router();

router.get('/theatres', new TheatreController().getTheatresByCityId);
router.get('/theatres/:theatresId/shows', new TheatreController().getUpcomingMovieShowsByTheatreAndMovieId);
router.get('/theatres/:theatreId/movies', new MovieController().getMoviesByTheatreId);

export default router;
