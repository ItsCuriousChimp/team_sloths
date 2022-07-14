import HeartbeatModel from '../common/models/heartbeat.model';
import HeartbeatRepository from '../repositories/heartbeat.repository';

export default class HeartbeatServices {
  public getBeat(): HeartbeatModel {
    return new HeartbeatRepository().getCurrentHeartbeat();
  }
}
