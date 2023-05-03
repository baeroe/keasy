import { app, shell, BrowserWindow, dialog, ipcMain, clipboard } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import robot from 'robotjs'
const fs = require('fs')
import icon from '../../resources/icon.png?asset'
const os = require('os')

const isMac = os.platform() === 'darwin'
const isWindows = os.platform() === 'win32'
const isLinux = os.platform() === 'linux'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  ipcMain.handle('showOpenDialog', (event, config) => {
    return dialog.showOpenDialog(config)
  })

  ipcMain.handle('writeFileSync', (event, config) => {
    fs.writeFileSync(config.path, config.content)
  })

  ipcMain.handle('readFileSync', (event, path) => {
    var buffer = fs.readFileSync(path)
    return buffer.toString()
  })
  ipcMain.handle('isFileExisting', (evssworent, path) => {
    return fs.existsSync(path)
  })

  ipcMain.handle('minimizeAndPasteCredentials', (event, config) => {
    if (isMac) {
      robot.keyTap('tab', 'command')
      robot.keyTap('enter')
    }
    if (isWindows) {
      robot.keyTap('tab', 'alt')
    }
    robot.typeStringDelayed(config.username, 6000)
    robot.keyTap('tab')
    robot.typeStringDelayed(config.password, 6000)
    robot.keyTap('enter')
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
