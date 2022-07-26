import express from 'express';
import MovieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/movies', new MovieController().getMovieByCityId);

export default router;
