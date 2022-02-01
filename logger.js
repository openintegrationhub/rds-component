const bunyan = require("bunyan");
const bunyanFormat = require("bunyan-format");

const envData = {};

const formatOut = bunyanFormat({
  outputMode: "long" /* , levelInString: true */,
});

const log = bunyan
  .createLogger({
    name: "app",
    streams: [
      {
        level: "trace",
        // stream: process.stdout // log INFO and above to stdout
        stream: formatOut,
      },
    ],
    level: "trace",
    src: true,
  })

  .child(envData);

module.exports = log;
