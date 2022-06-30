const heartBeatModel = require('../../../common/model/heartBeatModel.ts');

const getHeartBeatRepo = () => {
  return heartBeatModel.model;
};

module.exports = { getHeartBeatRepo };
