
function updateCount(tabId, isOnRemoved) {
  chrome.tabs.query({})
  .then((tabs) => {
    let length = tabs.length;

    // onRemoved fires too early and the count is one too many.
    // see https://bugzilla.mozilla.org/show_bug.cgi?id=1396758
    if (isOnRemoved && tabId && tabs.map((t) => { return t.id; }).includes(tabId)) {
      length--;
    }

    chrome.browserAction.setBadgeText({text: length.toString()});
    if (length > 2) {
      chrome.browserAction.setBadgeBackgroundColor({'color': 'green'});
    } else {
      chrome.browserAction.setBadgeBackgroundColor({'color': 'red'});
    }
  });
}


chrome.tabs.onRemoved.addListener(
  (tabId) => { updateCount(tabId, true);
});
chrome.tabs.onCreated.addListener(
  (tabId) => { updateCount(tabId, false);
});
updateCount();
