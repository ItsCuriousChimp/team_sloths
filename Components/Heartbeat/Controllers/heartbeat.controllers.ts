import { HeartBeatPayload } from '../../../Payloads/heartbeat.payload.js';
import { HeartbeatService } from '../Services/heartbeat.service.js';

class HeartBeatController {
  public getHeartbeat(): HeartBeatPayload {
    const currentBeat = HeartbeatService.getHeartBeatServices();
    const beat = currentBeat.heartbeat;
    const payload = new HeartBeatPayload();
    payload.heartbeatTimestamp = beat;
    return payload;
  }
}

export { HeartBeatController };
