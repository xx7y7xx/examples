chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    '[example-ext] Received message from background script:',
    request
  );
  sendResponse('pong');
});

// console.log('[example-ext] contentScripts.js loaded');
