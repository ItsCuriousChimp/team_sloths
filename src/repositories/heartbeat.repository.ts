import DateTimeHelper from '../common/helpers/datetime.helper';
import HeartbeatModel from '../common/models/heartbeat.model';

export default class HeartbeatRepository {
  public getCurrentHeartbeat(): HeartbeatModel {
    return new HeartbeatModel(new DateTimeHelper().getCurrentDate());
  }
}
