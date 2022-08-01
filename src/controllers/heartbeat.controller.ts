import { Request, Response } from 'express';
import HeartbeatResponsePayload from './payloads/heartbeat-response.payload';
import HeartbeatServices from '../services/heartbeat.service';

export default class HeartbeatController {
  public getHeartbeat(req: Request, res: Response): void {
    const heartbeatService = new HeartbeatServices();
    const heartbeatResult = heartbeatService.getBeat();
    const beat = heartbeatResult.lastHeartbeatAtTimestamp;
    const payload = new HeartbeatResponsePayload();
    payload.heartbeatTimestamp = beat;
    res.json(payload);
  }
}
