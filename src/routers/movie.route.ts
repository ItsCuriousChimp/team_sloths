import express from 'express';
import MovieController from '../controllers/movie.controller';

const router = express.Router();

const movieController = new MovieController();

router.get('/', movieController.getMovieByCityId);
router.get('/theatres/:theatreId/movies', new MovieController().getMoviesByTheatreId);

export default router;
