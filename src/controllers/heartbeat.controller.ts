import { Response, Request } from 'express';
import HeartbeatResponsePayload from './payloads/heartbeat-response.payload';
import HeartbeatServices from '../services/heartbeat.service';
import mapper from '../common/mapper';
import HeartbeatModel from '../common/models/heartbeat.model';

export default class HeartbeatController {
  public getHeartbeat(req : Request, res: Response) : void {
    const heartbeatService : HeartbeatServices = new HeartbeatServices();
    const heartbeatResult : HeartbeatModel = heartbeatService.getBeat();

    const heartbeatResponsePayloadInstance : HeartbeatResponsePayload =
    mapper.map(heartbeatResult, HeartbeatModel, HeartbeatResponsePayload);

    res.send(heartbeatResponsePayloadInstance);
  }
}
