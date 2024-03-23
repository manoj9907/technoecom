const { createLogger, transports, format } = require("winston");

let loggerResponse = createLogger({
  transports: [
    new transports.File({
      filename: "API-Response.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "API-Error.log",
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.errors()
      ),
    }),
  ],
});
module.exports = { loggerResponse };
