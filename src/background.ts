chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse({ newsCount: request.newsCount });
  // バッジ
  chrome.browserAction.setBadgeText({ text: request.newsCount });
  chrome.browserAction.setBadgeBackgroundColor({ color: [198, 5, 82, 1] });
});
