import { HeartbeatModel } from '../../../common/models/heartbeat.model';

export class HeartbeatRepository {
  public currentHeartbeat(): Date {
    return new HeartbeatModel().heartbeatTimestamp;
  }
}
