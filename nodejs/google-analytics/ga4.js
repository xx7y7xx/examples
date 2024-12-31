/**
 * File: ga4.js
 * Description: This script demonstrates how to authenticate with the Google Analytics Data API (GA4) using OAuth 2.0.
 *
 * Usage:
 * KEY_FILE=client_secret_769***187-***.apps.googleusercontent.com.json PROPERTY_ID=405***144 node ga4.js
 *
 * Detailed usage: https://docs.google.com/document/d/17jGUH3ZACZVtd07sLspEOgBFMXf2fYT7HKDhtXD_x1w/edit?tab=t.0 (private doc)
 */

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');

// Path to the credentials JSON file
const KEY_FILE_PATH = path.join(__dirname, 'secrets', process.env.KEY_FILE);

const PROPERTY_ID = process.env.PROPERTY_ID;

// token.json stores in the `secrets` folder
const tokenPath = path.join(__dirname, 'secrets', 'token.json');

// Load client secrets from a local file.
const credentials = JSON.parse(fs.readFileSync(KEY_FILE_PATH));

// Create an OAuth2 client with the given credentials
const oAuth2Client = new OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Generate a URL for the user to visit to authorize the application
function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/analytics.readonly'],
  });
  console.log('Authorize this app by visiting this url:', authUrl);
}

// Create an HTTP server to listen for the OAuth 2.0 callback
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/oauth2callback')) {
    const query = url.parse(req.url, true).query;
    const code = query.code;

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error('Error retrieving access token', err);
        res.end('Error retrieving access token');
        return;
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFileSync(tokenPath, JSON.stringify(token));
      console.log('Token stored to ' + tokenPath);
      res.end('Authentication successful! You can close this window.');
      queryReports();
    });
  }
});

server.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
  getAccessToken();
});

// Query the Google Analytics Data API (GA4)
async function queryReports() {
  const analyticsdata = google.analyticsdata({
    version: 'v1beta',
    auth: oAuth2Client,
  });

  try {
    const response = await analyticsdata.properties.runReport({
      property: `properties/${PROPERTY_ID}`, // Replace with your actual Property ID
      requestBody: {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'sessions' }],
      },
    });

    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error querying reports', error);
  }
}

// Check if we have previously stored a token.
fs.readFile(tokenPath, (err, token) => {
  if (err) {
    console.log('Token not found, starting authentication process...');
  } else {
    oAuth2Client.setCredentials(JSON.parse(token));
    queryReports();
  }
});
