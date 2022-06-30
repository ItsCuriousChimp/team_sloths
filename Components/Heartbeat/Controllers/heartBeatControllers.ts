const heartBeatService = require('../Services/heartBeatService.ts');
const currentBeat = require('../../../payloads/currentBeat.ts');

const getHeartBeat = (req, res) => {
  let heartBeat = heartBeatService.getHeartBeatServices();
  heartBeat.timeStamp = currentBeat.getCurrentBeat();
  res.send(heartBeat);
};

module.exports = {
  getHeartBeat
};
