chrome.runtime.onInstalled.addListener(() => {
  // Open the options page when the extension is installed
  chrome.runtime.openOptionsPage();
});

// Fetch base URL and favorite prefix from storage when the user enters a keyword
chrome.omnibox.onInputEntered.addListener((text) => {
  // Retrieve the base URL and favorite prefix from storage
  chrome.storage.sync.get(['baseUrl', 'favoritePrefix'], (data) => {
    const baseUrl = data.baseUrl || '';
    const favoritePrefix = data.favoritePrefix || '';

    if (!baseUrl) {
      // TODO Show a notification to the user
      // chrome.notifications.create({
      //   type: 'basic',
      //   iconUrl: 'icon.png',
      //   title: 'Error',
      //   message: 'Base URL is not set. Please configure it in the options.',
      //   priority: 2
      // });
      return;
    }

    let issue = '';
    if (text.indexOf('-') > -1) {
      issue = text;
    } else {
      issue = `${favoritePrefix}-${text}`
    }

    const finalUrl = `${baseUrl}/${issue}`;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url === 'chrome://newtab/') {
        chrome.tabs.update(currentTab.id, { url: finalUrl });
      } else {
        chrome.tabs.create({ url: finalUrl });
      }
    });
  });
});
