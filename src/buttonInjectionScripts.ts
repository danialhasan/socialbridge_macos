/**
 * These functions are stringified to fit on one line, and executed in the target window.
 * Since they're compressed to one line, no // comments in them are allowed. They break the functions,
 * throwing an 'unexpected end of input' error. /** These multi line comments are allowed. *\/
 */
export function injectButton() {
  console.log('injectButton script run');
  const actionButtonContainer = document.querySelector(
    '.notion-topbar-action-buttons'
  );
  const newButton = document.createElement('div');
  newButton.id = 'socialbridge_button';
  newButton.appendChild(document.createTextNode('Activate SocialBridge'));
  actionButtonContainer.appendChild(newButton);
}

export function injectButtonFunctionality() {
  console.log('injectButtonFunctionality script run');
  const button = document.getElementById('socialbridge_button');
  button.append(createSettingsMenu());
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
    menu.innerHTML = localStorage.getItem('menuHTML');
    menu.style['display'] = localStorage.getItem('showSocialBridgeMenu')
      ? 'block'
      : 'none';
    console.log(
      'Menu created, showMenuHTML: ',
      localStorage.getItem('showSocialBridgeMenu')
    );
    console.log('Settings created');
    return menu;
  }
}
export function setLocalStorage() {
  const menuHTML = `
    <div
      style='display: block; width: 200px; height: 100px; border: 1px solid red'
    >
      <h3>SocialBridge Settings</h3>
    </div>
  `;
  localStorage.setItem('menuHTML', menuHTML);
  /*  
  SB menu node isn't created until injected button is pressed.
  The 'showSocialBridgeMenu setting toggles the menu visibility
  after the injection button is pressed.
  */
  localStorage.setItem('showSocialBridgeMenu', 'true');
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
  localStorage.removeItem('menuHTML');
}
