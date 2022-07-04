import { HeartbeatResponsePayload } from '../../../Payloads/heartbeat-response.payload.js';
import { HeartbeatService } from '../Services/heartbeat.service.js';

class HeartbeatController {
  public getHeartbeat(): HeartbeatResponsePayload {
    const currentBeat = HeartbeatService.getHeartBeatServices();
    const beat = currentBeat.lastBeatGeneratedAt;
    const payload = new HeartbeatResponsePayload();
    payload.lastBeatGeneratedAt = beat;
    return payload;
  }
}

export { HeartbeatController };
