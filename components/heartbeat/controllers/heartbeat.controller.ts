import { HeartbeatResponsePayload } from '../../../payloads/heatbeat-response.payload';
import { HeartbeatServices } from '../services/heartbeat.service';

export class HeartbeatController {
  public getHeartbeat(): HeartbeatResponsePayload {
    const heartbeatService = new HeartbeatServices();
    const heatbeatResult = heartbeatService.getBeat();
    const beat = heatbeatResult.lastHeartbeatAtTimestamp;
    const payload = new HeartbeatResponsePayload();
    payload.heartbeatTimestamp = beat;
    return payload;
  }
}
