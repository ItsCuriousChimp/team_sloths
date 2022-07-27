import { AutoMap } from '@automapper/classes';

export default class HeartbeatModel {
  @AutoMap()
    heartbeatAtTimestamp!: Date;
  constructor(timestamp: Date) {
    this.heartbeatAtTimestamp = timestamp;
  }
}
