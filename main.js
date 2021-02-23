'use strict';

const {app, BrowserWindow, webContents, session } = require('electron');
const urlChecker = require('./libs/urlChecker');
const tray = require('./controllers/tray');

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    title: 'Youtube TV',
    width: 1240,
    height: 720,
    icon: __dirname + '/favicon.ico',
    show: false
  });
  mainWindow.setMenu(null);
  tray.init(mainWindow);

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (SMART-TV; Linux; Tizen 2.4.0) AppleWebkit/538.1 (KHTML, like Gecko) SamsungBrowser/1.1 TV Safari/538.1';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  mainWindow.webContents.on('did-navigate-in-page', (event, url, isMainFrame) => {
    urlChecker.init(url);

    if (urlChecker.includePath('control')) {
      mainWindow.minimize();
      mainWindow.focus();
      mainWindow.maximize();
      mainWindow.setFullScreen(true);
    }

    if (urlChecker.includePath("browse-sets")) {
      mainWindow.setFullScreen(false);
    }
  });

  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
  });

  mainWindow.loadURL('https://www.youtube.com/tv');

});
