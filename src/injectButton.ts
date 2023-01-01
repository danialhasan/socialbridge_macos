// @ts-ignore
export function injectButton() {
  console.log('Hello!!!', document);
  setTimeout(() => {
    const actionButtonContainer = document.querySelector(
      '.notion-topbar-action-buttons'
    );
    const newButton = document.createElement('div');
    newButton.appendChild(document.createTextNode('Activate SocialBridge'));
    console.log(actionButtonContainer);
    actionButtonContainer.appendChild(newButton);
  }, 4000);
}
