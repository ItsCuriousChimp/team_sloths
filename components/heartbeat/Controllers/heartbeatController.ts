import responsePayload from '../../../payloads/heartbeatResponse';
import getBeat from '../Services/heartbeatService';

const getHeartbeat = (req: Request, res: any) => {
  const beat = getBeat();
  beat.beatTimeStamp = responsePayload();
  res.send(beat);
};

export default getHeartbeat;
