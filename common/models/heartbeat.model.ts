export class HeartbeatModel {
  heartbeat: Date;

  constructor(timestamp: Date) {
    this.heartbeat = timestamp;
  }
}
