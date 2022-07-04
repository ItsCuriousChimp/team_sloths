import { HeartbeatResponsePayload } from '../../../payloads/HeartbeatResponse.payload';
import { HeartbeatServices } from '../services/heartbeat.service';

export class HeartbeatController {
  public getHeartbeat(): HeartbeatResponsePayload {
    const heartbeatService = new HeartbeatServices();
    const timeStamp = heartbeatService.getBeat();
    const beat = timeStamp.heartbeat;
    const payload = new HeartbeatResponsePayload(beat);
    return payload;
  }
}
