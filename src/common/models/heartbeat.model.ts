import { AutoMap } from '@automapper/classes';

export default class HeartbeatModel {
  @AutoMap()
    heartbeatTimestamp!: Date;
  constructor(timestamp: Date) {
    this.heartbeatTimestamp = timestamp;
  }
}
