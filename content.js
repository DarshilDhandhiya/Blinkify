chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getClipboardData") {
      navigator.clipboard.readText().then((copiedText) => {
        sendResponse({ text: copiedText });
      }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
        sendResponse({ error: 'Failed to read clipboard contents' });
      });
      return true; // Will respond asynchronously.
    }
  });
  