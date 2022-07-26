import express from 'express';
import HeartbeatController from '../controllers/heartbeat.controller';

const router = express.Router();

router.get('/heartbeat', new HeartbeatController().getHeartbeat);

export default router;
