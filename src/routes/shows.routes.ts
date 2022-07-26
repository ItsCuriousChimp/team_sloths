import express from 'express';
import BookedSeatController from '../controllers/booked-seat.controller';

const router = express.Router();
router.get('/shows', new BookedSeatController().getBookedSeatsByMovieId);

export default router;
