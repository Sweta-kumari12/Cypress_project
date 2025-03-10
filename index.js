const { addVideoRecorderPlugin } = require('cypress-video-recorder/plugin');

module.exports = (on, config) => {
  addVideoRecorderPlugin(on, config);
};