export default class HeartbeatModel {
  lastBeatGeneratedAt: Date;

  constructor(timestamp: Date) {
    this.lastBeatGeneratedAt = timestamp;
  }
}
