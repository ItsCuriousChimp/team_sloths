import HeartbeatModel from '../common/models/heartbeat.model';

export default class HeartbeatRepository {
  public getCurrentHeartbeat(): HeartbeatModel {
    const heartbeatModelInstance = new HeartbeatModel(new Date());
    return heartbeatModelInstance;
  }
}
