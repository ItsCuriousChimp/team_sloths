import { HeartbeatResponsePayload } from '../../../Payloads/heartbeat-response.payload.js';
import { HeartbeatService } from '../Services/heartbeat.service.js';

class HeartbeatController {
  public getHeartbeat(): HeartbeatResponsePayload {
    const currentBeat = HeartbeatService.getHeartBeatServices();
    const beatTs = currentBeat.lastBeatGeneratedAt;
    const payload = new HeartbeatResponsePayload();
    payload.lastBeatGeneratedAt = beatTs;
    return payload;
  }
}

export { HeartbeatController };
