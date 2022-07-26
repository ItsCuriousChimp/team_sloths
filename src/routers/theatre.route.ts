import express from 'express';
import TheatreController from '../controllers/theatre.controller';

const router = express.Router();

const theatreController = new TheatreController();

router.get('/', theatreController.getTheatresByCityId);

export default router;
