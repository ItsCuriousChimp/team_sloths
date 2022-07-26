import express from 'express';
import MovieController from '../controllers/movie.controller';

const router = express.Router();

router.get('/', new MovieController().getMovieByCityId);

export default router;
