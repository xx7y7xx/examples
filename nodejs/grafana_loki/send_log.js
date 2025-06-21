/**
 * Send log to Grafana Cloud
 *
 * Usage 1:
 * const sendLog = require('./upload_log.js');
 * await sendLog('info', 'Train scraping started', { batch_id: 'batch-1' });
 *
 * Usage 2:
 * GRAFANA_PASSWORD=your_password GRAFANA_USERNAME=your_username node send_log.js
 *
 * Environment variables:
 * - GRAFANA_PASSWORD: Grafana Cloud password
 * - GRAFANA_USERNAME: Grafana Cloud username
 */

const axios = require("axios");

/**
 * Send log to Grafana Cloud
 * @param {string} level - Log level, one of "info", "warn", "error"
 * @param {string} message - Log message
 * @param {object} labels - Log labels
 */
async function sendLog(level, message, labels = {}) {
  try {
    const timestamp = Date.now() * 1000000;
    const payload = {
      streams: [
        {
          stream: {
            job: "examples__nodejs__grafana_loki",
            level,
            ...labels,
          },
          values: [[timestamp.toString(), message]],
        },
      ],
    };

    await axios.post(
      "https://logs-prod-030.grafana.net/loki/api/v1/push",
      payload,
      {
        auth: {
          username: process.env.GRAFANA_USERNAME,
          password: process.env.GRAFANA_PASSWORD,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(`❌ Failed to send log: ${error.message}`);
  }
}

module.exports = sendLog;

if (require.main === module) {
  const now = new Date().toISOString();
  sendLog("info", `Test log at ${now}`).then(() => {
    console.log("✅ Log sent");
  });
  sendLog("warn", `Test warn log at ${now}`).then(() => {
    console.log("✅ Warn log sent");
  });
  sendLog("error", `Test error log at ${now}`).then(() => {
    console.log("✅ Error log sent");
  });
}
