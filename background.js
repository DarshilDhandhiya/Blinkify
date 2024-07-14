chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: readClipboardAndShortenUrl
  });
});

function readClipboardAndShortenUrl() {
  navigator.clipboard.readText().then((copiedText) => {
    if (copiedText && copiedText.startsWith('http')) {
      fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(copiedText)}`)
        .then(response => response.text())
        .then(shortUrl => {
          navigator.clipboard.writeText(shortUrl).then(() => {
            console.log('Short URL copied to clipboard');
            alert(`Shortened URL copied: ${shortUrl}`);
          }).catch(err => {
            console.error('Could not copy text: ', err);
          });
        })
        .catch(error => {
          console.error('Error shortening URL: ', error);
        });
    } else {
      console.error('No valid URL found in the clipboard.');
      alert('No valid URL found in the clipboard.');
    }
  }).catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
}
