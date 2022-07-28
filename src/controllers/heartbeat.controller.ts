import mapper from '../common/mappings/mapper';

import HeartbeatResponsePayload from './payloads/heartbeat-response.payload';
import HeartbeatServices from '../services/heartbeat.service';
import HeartbeatModel from '../common/models/heartbeat.model';

export default class HeartbeatController {
  public getHeartbeat(): HeartbeatResponsePayload {
    const heartbeatService = new HeartbeatServices();
    const heartbeatResult = heartbeatService.getBeat();
    const payload = mapper.map(heartbeatResult, HeartbeatModel, HeartbeatResponsePayload);
    return payload;
  }
}
