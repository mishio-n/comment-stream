import { app, shell, BrowserWindow, ipcMain, Menu, Tray, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null

function createWindow(): void {
  const browserWindow = new BrowserWindow({
    width: 900,
    height: 120,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    transparent: true,
    frame: false
  })

  browserWindow.setAlwaysOnTop(true, 'floating')

  browserWindow.on('ready-to-show', () => {
    browserWindow.show()
  })

  browserWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    browserWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    browserWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow = browserWindow
}

function createMenu(): void {
  const menu = Menu.buildFromTemplate([
    {
      label: 'setting'
    },
    {
      label: 'exit',
      role: 'quit'
    }
  ])

  const icon = nativeImage.createFromPath(`${__dirname}/../../resources/icon.png`)
  tray = new Tray(icon)
  tray.setContextMenu(menu)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()
  createMenu()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // app.dock.hide()

  let i = 0
  setInterval(() => {
    const tweet = 'message' + i
    mainWindow?.webContents.send('tweet', tweet)
    i++
  }, 10000)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
