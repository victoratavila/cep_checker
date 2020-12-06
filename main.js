const {app, BrowserWindow, shell} = require('electron')
const ejse = require('ejs-electron');

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        devTools: false,
        setMenuBarVisibility: false,
        nativeWindowOpen: true,
        devToolsNativeWindowOpen: false
      },
      icon: __dirname + '/public/img/icon.png'
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL('file://' + __dirname + '/public/views/index.ejs');
    // shell.openExternal('https://github.com');
})

