/**
 * These functions are stringified to fit on one line, and executed in the target window.
 * Since they're compressed to one line, no // comments in them are allowed. They break the functions,
 * throwing an 'unexpected end of input' error. /** These multi line comments are allowed. *\/
 */
export function injectButton() {
  const actionButtonContainer = document.querySelector(
    '.notion-topbar-action-buttons'
  );
  const newButton = document.createElement('div');
  newButton.addEventListener('mouseenter', () => {
    /**@ts-ignore */
    newButton.style['background-color'] = '#ddd';
    newButton.style['color'] = '#222';
  });

  newButton.addEventListener('mouseleave', () => {
    /**@ts-ignore */
    newButton.style['background-color'] = '#FFF';
    newButton.style['color'] = '#000';
  });
  newButton.id = 'socialbridge_button';
  newButton.appendChild(document.createTextNode('Activate SocialBridge'));
  actionButtonContainer.appendChild(newButton);
}

export function injectButtonFunctionality() {
  console.log('injectButtonFunctionality script run');
  const button = document.getElementById('socialbridge_button');
  document.body.appendChild(createSettingsMenu());
  button.addEventListener('click', () => {
    /**
     * toggle settings menu.
     * Create settings menu elsewhere before user clicks.
     */
    toggleSettingsMenu();
  });

  function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('socialbridge_menu');
    localStorage.setItem(
      'showSocialBridgeMenu',
      localStorage.getItem('showSocialBridgeMenu') === 'true' ? 'false' : 'true'
    );
    settingsMenu.style['display'] =
      localStorage.getItem('showSocialBridgeMenu') === 'true'
        ? 'block'
        : 'none';

    console.log('Settings toggled: ', settingsMenu.style['display']);
  }

  function createSettingsMenu(): Element {
    const menu = document.createElement('div');
    menu.id = 'socialbridge_menu';
    menu.innerHTML = returnMenuHTML();
    menu.style['display'] =
      localStorage.getItem('showSocialBridgeMenu') === 'true'
        ? 'block'
        : 'none';
    console.log(
      'Menu created, showMenuHTML: ',
      localStorage.getItem('showSocialBridgeMenu')
    );
    console.log('Settings created');
    return menu;
  }

  function returnMenuHTML(): string {
    const menuHTML = `
    <div
      style='
        position: absolute;
        z-index: 999;
        width: 500px;
        height: 500px;
        border: 3px solid black;
        top: calc(50vh - 250px);
        left: calc(50vw - 250px);
        background-color: white;
      '
    >
      <h3 style='
      text-align:center;
      '>SocialBridge Settings</h3>
      <button>Sign in with Twitter</button>
    </div>
  `;
    return menuHTML;
  }
}
export function setLocalStorage() {
  /*  
  SB menu node isn't created until injected button is pressed.
  The 'showSocialBridgeMenu setting toggles the menu visibility
  after the injected button is pressed.
  */
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
export function wipeLocalStorage() {
  localStorage.removeItem('showMenuHTML');
  console.log('Wiped localstorage of socialbridge values');
}
