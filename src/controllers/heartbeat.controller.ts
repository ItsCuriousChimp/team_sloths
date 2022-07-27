import { Request, Response } from 'express';
import HeartbeatResponsePayload from './payloads/heartbeat-response.payload';
import HeartbeatServices from '../services/heartbeat.service';
import mapper from '../common/mapper';
import HeartbeatModel from '../common/models/heartbeat.model';

export default class HeartbeatController {
  public async getHeartbeat(req: Request, res: Response) {
    const heartbeatService = new HeartbeatServices();
    const heartbeatResult = heartbeatService.getBeat();
    const payload = mapper.map(heartbeatResult, HeartbeatModel, HeartbeatResponsePayload);
    res.json(payload);
  }
}
