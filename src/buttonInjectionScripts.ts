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
  try {
    document
      .getElementById('twitterAuthBtn')
      .addEventListener('click', (event) => {
        event.preventDefault();
        console.log('ipc-renderer: ', ipcRenderer);
        ipcRenderer.send('open-auth-window')
        /**
         * Twitter OAuth in electron applications involves
         * creating another browser window through which the twitterAuthURL
         * is opened. After granting access, the second browser window
         * gives token info to the first browser window through IPC.
         * The token is exposed with this approach, but it's fine because
         * we're using the PKCE API, where a code challenge is required for a
         * valid request.
         */
        console.log('Twitter auth button clicked');
      });
  } catch (error) {
    console.error(error);
  }
  button.addEventListener('click', () => {
    toggleSettingsMenu();
  });

  function toggleSettingsMenu() {
    /**@ts-ignore */
    const { ipcRenderer } = window.ipcRenderer;
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
    return menu;
  }

  function returnMenuHTML(): string {
    const twitterScope = 'tweet.write';
    const twitterRedirectURI =
      process.env.NODE_ENV === 'production'
        ? 'https://socialbridge-server.herokuapp.com/auth/twitter'
        : 'http://localhost:3000/auth/twitter';
    const twitterAuthURL = '';
    /*    const twitterAuthURL =
      'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=eHB6X085VjFfOHRqZGwwSFlubU46MTpjaQ&redirect_uri=' +
    twitterRedirectURI + '&scope=' + twitterScope + ''; */
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
      <button><a id='twitterAuthBtn' href=${twitterAuthURL}>Sign in with Twitter</a></button>
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
