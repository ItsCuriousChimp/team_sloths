import { HeartbeatResponse } from '../../../payloads/heartbeat.response';
import { HeartbeatServices } from '../services/heartbeat.service';

export class HeartbeatController {
  public getHeartbeat(req: Request, res: any): void {
    let beat = new HeartbeatServices().getBeat();
    beat = new HeartbeatResponse().responsePayload();
    res.send(beat);
  }
}
