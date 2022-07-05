import HeartbeatResponsePayload from '../../../payloads/heartbeat-response.payload';
import HeartbeatServices from '../services/heartbeat.service';

export default class HeartbeatController {
  public getHeartbeat(): HeartbeatResponsePayload {
    const heartbeatService = new HeartbeatServices();
    const heartbeatResult = heartbeatService.getBeat();
    const beatTs = heartbeatResult.lastBeatGeneratedAt;
    const payload = new HeartbeatResponsePayload();
    payload.lastBeatGeneratedAt = beatTs;
    return payload;
  }
}
