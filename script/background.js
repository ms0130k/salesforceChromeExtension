'use strict';

(() => {
  const initData = {
    'sf-app-opener': [
      { type: 'default', name: 'Open salesforce app launcher', keys: ['Control', '', 'q'] },
      { type: 'default', name: 'Focus on quick find', keys: ['Alt', '', 'q'] },
      { type: 'default', name: 'Open this object manager', keys: ['Control', 'Shift', 'q'] },
      { type: 'setup', name: 'Flows/home', keys: ['Control', 'Shift', 'e'] },
      { type: 'setup', name: 'ManageUsers/home', keys: ['Control', 'Shift', 'z'] },
      { type: 'setup', name: 'EnhancedProfiles/home', keys: ['Control', 'Shift', 'x'] },
    ],
  };
  chrome.storage.sync.get('sf-app-opener').then((data) => {
    if (!data || Object.keys(data).length === 0) chrome.storage.sync.set(initData);
  });
})();
