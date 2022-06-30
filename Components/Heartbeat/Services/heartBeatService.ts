const heartBeatRepository = require('../Repository/heartBeatRepository.ts');

const getHeartBeatServices = () => {
  return heartBeatRepository.getHeartBeatRepo();
};

module.exports = { getHeartBeatServices };
