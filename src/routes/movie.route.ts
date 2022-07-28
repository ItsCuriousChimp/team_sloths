import express from 'express';
import MoviesController from '../controllers/movie.controller';

const router = express.Router();

router.get('/', new MoviesController().getMovieByCityId);

export default router;
