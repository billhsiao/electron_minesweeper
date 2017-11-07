'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
const path = require('path')
const url = require('url')


let mainWindow



function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function() {
        mainWindow = null

    })

}

app.on('ready', createWindow)

app.on('ready', () => {
  // Register a 'CommandOrControl+Y' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Y', () => {
    console.log('pressed');
    // Do stuff when Y and either Command/Control is pressed.
    //app.quit();
  })
  if (!ret) {
    console.log('registration failed')
  }
  console.log(globalShortcut.isRegistered('CommandOrControl+Y'))

})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+Y')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})
//
//app.on('ready', function() {
//    mainWindow = new BrowserWindow({
//        height: 600,
//        width: 800
//    });
//
//    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
//});
