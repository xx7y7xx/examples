// Wait for backgroundScript.js to send message every 10s
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    '[could_not_establish_connection] Received message from background script:',
    request
  );
  sendResponse('pong');
});
