import responsePayload from '../../../payloads/heartbeatResponse.js';
import getBeat from '../Services/heartbeatService.js';

const getHeartbeat = (req, res) => {
  const beat = getBeat();
  beat.beatTimeStamp = responsePayload();
  res.send(beat);
};

export default getHeartbeat;
