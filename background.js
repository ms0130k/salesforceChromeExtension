'use strict';

const executeCommand = (command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, command);
  });
};

const getCurrentTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

chrome.commands.getAll().then((commands) => {
  for (let command of commands) {
    for (const [key, value] of Object.entries(command)) {
      console.log(`${key}: ${value}`);
    }
  }
});

chrome.commands.onCommand.addListener((command) => {
  getCurrentTab().then((tab) => {
    const forceRegex = /https:\/\/.*\.force\.com\/.*/;
    if (forceRegex.test(tab.url)) executeCommand(command);
  });
});
