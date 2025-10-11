// Service worker: bridge content_script fetch to backend and/or open WS channel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "track") {
    fetch("https://api.example.com/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: request.url })
    }).then(r => r.json()).then(data => {
      sendResponse({ ok: true, data });
    }).catch(err => sendResponse({ ok: false, error: String(err) }));
    return true; // keep channel open for async response
  }
});
