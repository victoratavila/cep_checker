const {app, BrowserWindow} = require('electron')
const ejse = require('ejs-electron')
 
let mainWindow

ejse.data('username', 'Some Guy')
 
app.on('ready', () => {
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        devTools: false
      },
      icon: __dirname + '/public/img/icon.png'
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadURL('file://' + __dirname + '/public/views/index.ejs');
})