'use strict';

console.log('tttttttttttttttttttttttttttt');
console.log('tttttttttttttttttttttttttttt');
console.log('tttttttttttttttttttttttttttt');
console.log('tttttttttttttttttttttttttttt');

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

const openThisObjectManager = () => {
  const objectName = location.pathname.split('/')[3];
  window.open(
    `${location.origin}/lightning/setup/ObjectManager/${objectName}/view`
  );
};

const openPageEdit = () => {
  const setupButtonClassName =
    'menuTriggerLink slds-button slds-button_icon slds-button_icon slds-button_icon-container slds-button_icon-small slds-global-actions__setup slds-global-actions__item-action';
  const setupButton = document.getElementsByClassName(setupButtonClassName)[0];
  if (setupButton) {
    setupButton.click();
    window.setTimeout(() => {
      const pageEditAnchor = document.querySelector('[data-id=edit-page]');
      if (pageEditAnchor) location.href = pageEditAnchor.href;
    }, 1000);
  }
};

const openSetupFlows = () => {
  console.log(`${location.origin}/lightning/setup/Flows/home`);
  window.open(`${location.origin}/lightning/setup/Flows/home`);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'open-app-launcher') {
    openAppLauncher();
  } else if (message === 'focus-quick-find') {
    focusQuickFind();
  } else if (message === 'open-object-manager') {
    openThisObjectManager();
  } else if (message === 'open-setup-flows') {
    openSetupFlows();
  }
});
