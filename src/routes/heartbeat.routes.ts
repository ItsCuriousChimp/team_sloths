import express from 'express';
import HeartbeatController from '../controllers/heartbeat.controller';

const router = express.Router();

router.get('/', new HeartbeatController().getHeartbeat);

export default router;
