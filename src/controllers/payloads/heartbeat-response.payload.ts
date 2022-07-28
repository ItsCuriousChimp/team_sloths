import { AutoMap } from '@automapper/classes';

export default class HeartbeatResponsePayload {
  @AutoMap()
    heartbeatTimestamp!: Date;
}
