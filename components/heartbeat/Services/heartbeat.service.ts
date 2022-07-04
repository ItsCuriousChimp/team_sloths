import { HeartbeatRepository } from '../repository/heartbeat.repository';

export class HeartbeatServices {
  public getBeat(): Date {
    return new HeartbeatRepository().currentHeartbeat();
  }
}
