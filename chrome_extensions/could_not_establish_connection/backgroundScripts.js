// Send message to contentScript.js in google.com tab every 10s
setInterval(async () => {
  // find google.com tab (open google.com tab first)
  const [tab] = await chrome.tabs.query({ url: 'https://www.google.com/' });

  if (!tab) return;

  try {
    // send message to content script in google.com tab
    const response = await chrome.tabs.sendMessage(tab.id, 'ping');
    console.log(
      '[could_not_establish_connection] Received from content script in google.com tab:',
      response
    );
  } catch (error) {
    console.log(
      '%c[could_not_establish_connection] Failed to send message to content script',
      'color: red',
      { error, tab }
    );

    /**
     * You will see this error message when
     * 1. The content script is not loaded for google.com tab (for example, tabs opened before the extension is installed)
     * 2. The content script is loaded but the extension is reloaded (for example, after tabs opened with content script, the extension is reloaded)
     *
     * To fix this issue, need to reload the content script.
     */
    if (
      error.message ===
      'Could not establish connection. Receiving end does not exist.'
    ) {
      /**
       * Put `"host_permissions": ["https://google.com/*"]` in manifest.json
       * Otherwise you will see error: Uncaught (in promise) Error: Cannot access contents of url "https://www.google.com/". Extension manifest must request permission to access this host.
       */
      console.log(
        '[could_not_establish_connection] Fix the issue by reloading the content script'
      );
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['/contentScripts.js'],
      });
    }
  }

  console.log('[could_not_establish_connection] Wait for 10s\n\n\n\n');
}, 10000);
