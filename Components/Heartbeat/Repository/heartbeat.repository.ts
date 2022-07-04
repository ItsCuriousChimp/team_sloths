import { HeartbeatModel } from '../../../Common/Model/heartbeat.model.js';

class heartBeatRepository {
  public static getHeartBeatRepo(): HeartbeatModel {
    return new HeartbeatModel(new Date());
  }
}

export { heartBeatRepository };
