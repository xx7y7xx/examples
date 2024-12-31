/**
 * File: bigquery.js
 * Description: This script demonstrates how to authenticate with BigQuery using a service account key file.
 *
 * Usage:
 * KEY_FILE=red-dominion-24***14-***.json BIG_QUERY_PROJECT_ID=red-dominion-24***14 node bigquery.js
 *
 * Detailed usage: https://docs.google.com/document/d/17jGUH3ZACZVtd07sLspEOgBFMXf2fYT7HKDhtXD_x1w/edit?tab=t.0 (private doc)
 */

const { BigQuery } = require('@google-cloud/bigquery');
const path = require('path');

const BIG_QUERY_PROJECT_ID = process.env.BIG_QUERY_PROJECT_ID;

// Path to the service account key file for BigQuery to access the GA data
const KEY_FILE_PATH = path.join(__dirname, 'secrets', process.env.KEY_FILE);

// Create a BigQuery client
const bigquery = new BigQuery({
  keyFilename: KEY_FILE_PATH,
  projectId: BIG_QUERY_PROJECT_ID, // Replace with your actual project ID
});

async function queryEvents() {
  const query = `
    SELECT
      event_timestamp,
      event_name,
      user_pseudo_id,
      event_bundle_sequence_id,
      event_previous_timestamp,
      event_value_in_usd,
      event_params.key,
      event_params.value.string_value,
      event_params.value.int_value,
      event_params.value.float_value,
      event_params.value.double_value
    FROM
      \`${BIG_QUERY_PROJECT_ID}.YOUR_DATASET_ID.events_*\`
    WHERE
      _TABLE_SUFFIX BETWEEN '20220101' AND '20220131'
    LIMIT 1000;
  `;

  const options = {
    query: query,
    location: 'US',
  };

  // Run the query
  const [rows] = await bigquery.query(options);
  console.log('Query Results:');
  rows.forEach((row) => console.log(row));
}

queryEvents().catch(console.error);
