'use strict';

(() => {
  const SELECTED = 'selected';
  HTMLElement.prototype.appendHTML = function (html) {
    if (!html) return;
    const docFrag = document.createDocumentFragment();
    const div = docFrag.appendChild(document.createElement('div'));
    div.innerHTML = html;
    while (div.childElementCount) {
      this.appendChild(div.firstChild);
    }
  };

  const writeKeys = function (keyData) {
    keyData.forEach(({ type, name, keys }) => {
      const [firstKey, secondKey, thirdKey] = keys;
      let row = ``;
      row += `<div class="row" data-type="${type}">`;
      if (type === 'default')
        row += `<div class="col">
                  <span class="name" name="name">${name}</span>
                </div>`;
      else
        row += `<div class="col">
                  <input type="text" class="name input" name="name" value="${name}" />
                </div>`;
      row += `<div class="col">
                <select class="select input" name="key">
                  <option value="Control" ${firstKey === 'Ctrl' ? SELECTED : ''}>Ctrl</option>
                  <option value="Alt" ${firstKey === 'Alt' ? SELECTED : ''}>Alt</option>
                </select>
              </div>
              <div class="col">
                <select class="select input" name="key">
                  <option value="" ${!secondKey ? SELECTED : ''}></option>
                  <option value="Shift" ${secondKey ? SELECTED : ''}>Shift</option>
                </select>
              </div>
              <div class="col">
                <input type="text" class="input input-key" name="key" value="${thirdKey}" maxlength="1"/>
              </div>
            </div>`;
      if (type === 'default') document.getElementById('defaultList').appendHTML(row);
      else document.getElementById('setupList').appendHTML(row);
    });
  };

  const initOption = function (data) {
    writeKeys(data['sf-app-opener']);
  };
  chrome.storage.sync.get('sf-app-opener').then((result) => initOption(result));

  const btnSave = document.getElementById('btnSave');
  const saveKeySetList = function () {
    const keySetList = [];
    const rows = document.querySelectorAll(`.row`);
    rows.forEach((row) => {
      const type = row.dataset.type;
      const name = row.querySelector('[name=name]').textContent || row.querySelector('[name=name]').value;
      const keys = Array.from(row.querySelectorAll('[name=key]')).map((el) => el.value);
      const keySet = { type, name, keys };
      keySetList.push(keySet);
    });
    return keySetList;
  };

  const save = function (e) {
    const keySetList = saveKeySetList();
    const displayMessage = function () {
      const messageArea = document.getElementById('msg');
      if (messageArea) messageArea.textContent = '적용되었습니다.';
    };
    chrome.storage.sync.set({ 'sf-app-opener': keySetList }, displayMessage);
  };

  btnSave.addEventListener('click', save);

  const questionMark = document.getElementById('questionMark');
  const displayHelp = function (e) {
    const helpSetupArea = document.getElementById('helpSetupArea');
    if (helpSetupArea) {
      helpSetupArea.classList.add('disp-flex');
    }
  };
  const hideHelp = function (e) {
    const helpSetupArea = document.getElementById('helpSetupArea');
    if (helpSetupArea) helpSetupArea.classList.remove('disp-flex');
  };
  questionMark.addEventListener('mouseover', displayHelp);
  questionMark.addEventListener('mouseleave', hideHelp);
})();
