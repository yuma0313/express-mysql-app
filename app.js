const PORT = process.env.PORT || 3000;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const MySQLClient = require("./lib/database/client.js");

const app = express();

// Express settings
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Static resource rooting.
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

// Set access log.
app.use(accesslogger());

// Dynamic resource rooting.
app.use("/", require("./routes/index.js"));
app.use("/test", async (req, res, next) => {
  try {
    const results = await MySQLClient.executeQuery(
      'SELECT * FROM `t_shop` WHERE `id` = ?',
      [1]
    );
    console.log("results", results);
    res.end("OK");
  } catch (err) {
    console.error("Error:", err);
    next(err);
  } finally {
    await MySQLClient.end();
  }
});

// Set application log.
app.use(applicationlogger());

// Execute web application.
app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});
