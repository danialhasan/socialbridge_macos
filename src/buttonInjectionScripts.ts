/**
 * These functions are stringified to fit on one line, and executed in the target window.
 * Since they're compressed to one line, no comments are allowed. They break the functions,
 * throwing an 'unexpected end of input' error.
 */
export function injectButton() {
  console.log('injectButton script run');
  setTimeout(() => {
    const actionButtonContainer = document.querySelector(
      '.notion-topbar-action-buttons'
    );
    const newButton = document.createElement('div');
    newButton.id = 'socialbridge_button';
    newButton.appendChild(document.createTextNode('Activate SocialBridge'));
    actionButtonContainer.appendChild(newButton);
  });
}

export function injectButtonFunctionality() {
  setTimeout(function () {
    console.log('injectButtonFunctionality script run');
    const button = document.getElementById('socialbridge_button');
    button.addEventListener('click', () => {
      /**
       * Show menu element
       * Let menu element close when outside is selected
       */
      const menu = document.createElement('div');
      menu.id = 'socialbridge_menu';
      menu.innerHTML = localStorage.getItem('menuHTML');
      menu.style['display'] = localStorage.getItem('showMenuHTML')
        ? 'block'
        : 'none';
      console.log('Menu created');
      button.appendChild(menu);
    });
  });
}

export function setMenuHTML() {
  const menuHTML = `
    <div
      style='display: block; width: 200px; height: 100px; border: 1px solid red'
    >
      <h3>SocialBridge Settings</h3>
    </div>
  `;
  localStorage.setItem('menuHTML', menuHTML);
  localStorage.setItem('showSocialBridgeMenu', 'false');
}

export function stringifyFunctions(fn: Function[]): string[] {
  const stringifiedFunctions: string[] = [''];
  let stringifiedFunction;
  fn.forEach((_fn, index) => {
    stringifiedFunction = _fn.toString().replace(/\n/g, ' ');
    stringifiedFunctions[index] = stringifiedFunction;
  });
  return stringifiedFunctions;
}
