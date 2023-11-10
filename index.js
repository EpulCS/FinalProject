const { app, BrowserWindow, Menu } = require('electron');
const fs = require('fs')
const path = require('path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  const mainMenu = Menu.buildFromTemplate([
    {
      label: 'read/update/delete file',
      click() {
        mainWindow.loadFile(path.join(__dirname, 'readupddel.html'));
      },
    },
    {
      label: 'Create file',
      click(){
        mainWindow.loadFile(path.join(__dirname, 'create.html'))
      }
    },
    {
      label: 'Index Page',
      click() {
        mainWindow.loadFile(path.join(__dirname, 'index.html'));
      },
    },
    {
      label: 'Quit',
      accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
      click() {
        app.quit();
      },
    },
  ]);

  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
