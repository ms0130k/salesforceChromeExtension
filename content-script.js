'use strict';

const openAppLauncher = () => {
  const setupApp = document.querySelector(
    '.salesforceIdentityAppLauncherHeader'
  );
  const homeApp = !!document.getElementsByTagName('one-appnav')[0]
    ? document
        .getElementsByTagName('one-appnav')[0]
        .getElementsByTagName('div')[4]
    : false;
  if (setupApp) setupApp.click();
  if (homeApp) homeApp.click();
};

const focusQuickFind = () => {
  document.querySelector('input[placeholder="Quick Find"]').focus();
};

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'open-app-launcher') {
    openAppLauncher();
  } else if (message === 'focus-quick-find') {
    focusQuickFind();
  }
});
