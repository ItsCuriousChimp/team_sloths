import { HeartbeatRepository } from '../Repository/heartbeat.repository';

export class HeartbeatServices {
  public getBeat(): Date {
    return new HeartbeatRepository().currentHeartbeat();
  }
}
