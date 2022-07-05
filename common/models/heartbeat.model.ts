export default class HeartbeatModel {
  lastHeartbeatTimestamp: Date;

  constructor(timestamp: Date) {
    this.lastHeartbeatTimestamp = timestamp;
  }
}
