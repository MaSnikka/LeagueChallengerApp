const electron = require('electron');
const ipcMain = require('electron').ipcMain;
const BrowserWindow = electron.BrowserWindow;

const isDev = require('electron-is-dev');

const app = electron.app;
let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        backgroundColor: '#2A2A2A',
        width: 1280,
        height: 720,
        minWidth: 720,
        minHeight: 480,
        frame: false,
        webPreferences: { nodeIntegration: true }
    });

    mainWindow.setMenu(null)

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000')
    } else {
        mainWindow.loadFile('build/index.html')
    }

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('maximized')
    })

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('unmaximized')
    })

    mainWindow.on('close', function(e) {
        const choice = require('electron').dialog.showMessageBoxSync(this,
            {
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: 'Are you sure you want to quit?'
            });
        if (choice === 1) {
            e.preventDefault();
        }
    });
}

ipcMain.handle('minimize-event', () => {
    mainWindow.minimize()
})

ipcMain.handle('maximize-event', () => {
    mainWindow.maximize()
})

ipcMain.handle('unmaximize-event', () => {
    mainWindow.unmaximize()
})

ipcMain.handle('close-event', () => {
    app.quit()
})

app.on('browser-window-focus', () => {
    mainWindow.webContents.send('focused')
})

app.on('browser-window-blur', () => {
    mainWindow.webContents.send('blurred')
})

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});