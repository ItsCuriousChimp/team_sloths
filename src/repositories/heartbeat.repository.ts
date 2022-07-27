import { createMap, forMember, mapFrom } from '@automapper/core';
import DateTimeHelper from '../common/helpers/datetime.helper';
import mapper from '../common/mapper';
import HeartbeatModel from '../common/models/heartbeat.model';

export default class HeartbeatRepository {
  public getCurrentHeartbeat(): HeartbeatModel {
    createMap(
      mapper,
      Date,
      HeartbeatModel,
      forMember(
        (destination) => destination.heartbeatTimeStamp,
        mapFrom((source) => source),
      ),
    );
    const heartbeatModelInstance : HeartbeatModel =
      mapper.map(new DateTimeHelper().getCurrentDate(), Date, HeartbeatModel);
    return heartbeatModelInstance;
  }
}
