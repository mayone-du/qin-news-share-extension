chrome.runtime.onMessage.addListener((request) => {
  // ニュースの数を受け取ってバッジを設定
  chrome.browserAction.setBadgeText({ text: request.newsCount });
  chrome.browserAction.setBadgeBackgroundColor({ color: [198, 5, 82, 1] });
});
