import { HeartbeatModel } from '../../../common/models/heartbeat.model';
import { HeartbeatRepository } from '../repository/heartbeat.repository';

export class HeartbeatServices {
  public getBeat(): HeartbeatModel {
    return new HeartbeatRepository().getCurrentHeartbeat();
  }
}
