'use strict';

(() => {
  const openAppLauncher = () => {
    const setupApp = document.querySelector('.salesforceIdentityAppLauncherHeader');
    const homeApp = !!document.getElementsByTagName('one-appnav')[0]
      ? document.getElementsByTagName('one-appnav')[0].getElementsByTagName('div')[4]
      : false;
    if (setupApp) setupApp.click();
    if (homeApp) homeApp.click();
  };

  const focusQuickFind = () => {
    document.querySelector('input[placeholder="Quick Find"]').focus();
  };

  const openThisObjectManager = () => {
    const objectName = location.pathname.split('/')[3];
    window.open(`${location.origin}/lightning/setup/ObjectManager/${objectName}/view`);
  };

  const defaultFunctions = {
    'Open salesforce app launcher': openAppLauncher,
    'Focus on quick find': focusQuickFind,
    'Open this object manager': openThisObjectManager,
  };

  //보류
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

  const setShortCuts = function (data) {
    const keySetList = data['sf-app-opener'];

    const KEY_CONTROL = 'Control';
    const KEY_ALT = 'Alt';
    const KEY_SHIFT = 'Shift';
    let controlIsDown = false;
    let altIsDown = false;
    let shiftIsDown = false;

    const handleKeyup = function (e) {
      const key = e.key;
      if (key === KEY_CONTROL) {
        controlIsDown = false;
        return;
      }
      if (key === KEY_ALT) {
        altIsDown = false;
        return;
      }
      if (key === KEY_SHIFT) {
        shiftIsDown = false;
        return;
      }
    };

    const handleKeydown = function (e) {
      const key = e.key;
      if (!key) return;

      if (key === KEY_CONTROL) {
        controlIsDown = true;
        return;
      }
      if (key === KEY_ALT) {
        altIsDown = true;
        return;
      }
      if (key === KEY_SHIFT) {
        shiftIsDown = true;
        return;
      }

      const char = key.toUpperCase();

      const matchingKeySet = keySetList.find(({ keys }) => {
        const [firstKey, secondKey, thirdKey] = keys;
        let firstKeyCondition = false;
        let secondKeyCondition = false;
        let thirdKeyCondition = false;

        if ((firstKey === KEY_CONTROL && controlIsDown) || (firstKey === KEY_ALT && altIsDown)) firstKeyCondition = true;
        if ((secondKey === KEY_SHIFT && shiftIsDown) || (secondKey === '' && !shiftIsDown)) secondKeyCondition = true;
        if (thirdKey && thirdKey.trim() && thirdKey.toUpperCase() === char) thirdKeyCondition = true;
        return firstKeyCondition && secondKeyCondition && thirdKeyCondition;
      });
      if (matchingKeySet) {
        if (matchingKeySet.type === 'default') {
          defaultFunctions[matchingKeySet.name]();
        } else {
          window.open(`${location.origin}/lightning/setup/${matchingKeySet.name}`);
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
  };

  chrome.storage.sync.get('sf-app-opener', setShortCuts);
})();
