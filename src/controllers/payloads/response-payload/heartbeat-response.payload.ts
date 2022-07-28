import { AutoMap } from '@automapper/classes';

export default class HeartbeatResponsePayload {
  @AutoMap()
    heartbeatTimeStamp!: Date;
}
