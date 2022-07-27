export default class HeartbeatModel {
  lastHeartbeatAtTimestamp!: Date;
  constructor(timestamp: Date) {
    this.lastHeartbeatAtTimestamp = timestamp;
  }
}
