class HeartbeatModel {
  lastBeatGeneratedAt: Date;
  constructor(timeStamp: Date) {
    this.lastBeatGeneratedAt = timeStamp;
  }
}

export { HeartbeatModel };
