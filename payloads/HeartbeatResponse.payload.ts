export class HeartbeatResponsePayload {
  heartbeatTimestamp: Date;

  constructor(timestamp: Date) {
    this.heartbeatTimestamp = timestamp;
  }
}
