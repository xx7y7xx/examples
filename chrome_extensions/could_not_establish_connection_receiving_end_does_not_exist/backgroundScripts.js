// execute code every 10s
setInterval(async () => {
  // find google.com tab
  const [tab] = await chrome.tabs.query({ url: 'https://www.google.com/' });

  try {
    console.log('[example-ext] Sending message to content script');
    const response = await chrome.tabs.sendMessage(tab.id, 'ping');
    console.log('[example-ext] Received from content script:', response);
  } catch (error) {
    console.log(
      '%c[example-ext] Failed to send message to content script',
      'color: red',
      { error, tab }
    );

    if (
      error.message !==
      'Could not establish connection. Receiving end does not exist.'
    ) {
      return;
    }

    /**
     * You will see this error message when
     * 1. The content script is not loaded for google.com tab
     * 2. The content script is loaded but the extension is reloaded
     *
     * To fix this issue, we need to reload the content script.
     */

    console.log('[example-ext] Loading content script');
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['/contentScripts.js'],
    });
    console.log('[example-ext] Loaded content script');
  }

  console.log('[example-ext] Wait for 10s\n\n\n\n');
}, 10000);

// console.log('[example-ext] backgroundScripts.js loaded');
