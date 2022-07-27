import { AutoMap } from '@automapper/classes';

export default class HeartbeatResponsePayload {
  @AutoMap()
    heartbeatAtTimestamp!: Date;
}
