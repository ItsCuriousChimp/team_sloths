// const heartBeatRepository = require('../Repository/heartBeatRepository.ts');
import { HeartbeatModel } from '../../../Common/Model/heartbeat.model.js';
import { heartBeatRepository } from '../Repository/heartbeat.repository.js';

class HeartbeatService {
  public static getHeartBeatServices(): HeartbeatModel {
    return heartBeatRepository.getHeartBeatRepo();
  }
}

export { HeartbeatService };
