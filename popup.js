document.getElementById('shorten-button').addEventListener('click', () => {
  const url = document.getElementById('url-input').value;

  if (url) {
    fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`)
      .then(response => response.text())
      .then(shortUrl => {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;

        navigator.clipboard.writeText(shortUrl).then(() => {
          console.log('Short URL copied to clipboard');
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
      })
      .catch(error => {
        console.error('Error shortening URL: ', error);
      });
  } else {
    alert('Please paste a URL first.');
  }
});
