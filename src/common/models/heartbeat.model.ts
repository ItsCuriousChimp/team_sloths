import { AutoMap } from '@automapper/classes';

export default class HeartbeatModel {
  @AutoMap()
    heartbeatTimeStamp!: Date;
  constructor(timestamp: Date) {
    this.heartbeatTimeStamp = timestamp;
  }
}
