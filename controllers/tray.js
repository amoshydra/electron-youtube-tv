const electron = require('electron');
const platform = require('os').platform();

const { Tray, Menu } = electron;

const APP_TITLE = 'YouTube TV';
const ICON_PATH = `${__dirname}/../`;
const ICON_WINDOWS = 'favicon.ico';
const ICON_OSX = 'favicon.png';
let mainWindow;
let tray;

const SysTray = function SysTray() {};

SysTray.prototype.init = function init(_mainWindow) {
  tray = null;
  mainWindow = _mainWindow;
  setupTray();
};

function setupTray() {
  tray = new Tray(getIconFilepathForPlatform());
  tray.setToolTip(APP_TITLE);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show app',
      click() { mainWindow.show(); }
    }, { label: 'Hide app',
      click() { mainWindow.hide(); }
    }, { label: 'Exit',
      click() { mainWindow.destroy(); }
    }
  ]); tray.setContextMenu(contextMenu);
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

function getIconFilepathForPlatform() {
  let filePath;
  if (platform === 'darwin') {
    filePath = ICON_PATH + ICON_OSX;
  } else if (platform === 'win32') {
    filePath = ICON_PATH + ICON_WINDOWS;
  }
  return filePath;
}

module.exports = new SysTray();
