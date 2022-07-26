import express from 'express';

import HeartbeatController from '../controllers/heartbeat.controller';

const router = express.Router();

const heartbeatController = new HeartbeatController();

router.get('/', heartbeatController.getHeartbeat);

export default router;
