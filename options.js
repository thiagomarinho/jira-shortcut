// Load saved settings when the options page is opened
document.addEventListener('DOMContentLoaded', () => {
  const baseUrlInput = document.getElementById('baseUrl');
  const favoritePrefixInput = document.getElementById('favoritePrefix');
  const saveButton = document.getElementById('saveButton');

  // Load saved settings
  chrome.storage.sync.get(['baseUrl', 'favoritePrefix'], (data) => {
      baseUrlInput.value = data.baseUrl || '';
      favoritePrefixInput.value = data.favoritePrefix || '';
  });

  // Save settings when the button is clicked
  saveButton.addEventListener('click', () => {
      const baseUrl = baseUrlInput.value;
      const favoritePrefix = favoritePrefixInput.value;

      chrome.storage.sync.set({ baseUrl, favoritePrefix }, () => {
          alert('Settings saved successfully!');
      });
  });
});
