const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const fs = require('node:fs')
const path = require('node:path')

let nTemp = 0;

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 720,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    function sendTempSaves() {
      let tempData = []
      for (let i = 1; i < nTemp+1; i++) {
        fs.readFile(`tempfiles/data${i}.txt`, 'utf-8', (err,data) => {
          if(err) {console.error(err)}
          tempData.push(data)
          win.webContents.send('send-tempsaves', data)
        })
      }
    }    

    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: "New file",
            click: () => win.webContents.send('call-tempsave')
          },
          {
            label: "Save as...",
            click: () => win.webContents.send('call-save')
          }
        ]
      }
    ]
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    ipcMain.on('save-file', async (event, data) => {
      const { filePath } = await dialog.showSaveDialog(win, {
        title: "Save as...",
        defaultPath: path.join(__dirname, "save.txt"),
        filters: [{name: "Text Files", extensions: ["txt"]}]
      })

      if(filePath) {
        fs.writeFile(filePath, data, err => {
          if(err) {console.error(err)}
        })
      }
    })

    ipcMain.on('temp-save', (event, data) => {
      nTemp += 1
      dir = "tempfiles/"

      if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }

      fs.writeFile(`tempfiles/data${nTemp}.txt`, data, err => {
        if(err) {console.error(err)}
        sendTempSaves()
      })
    })

    win.loadFile('page/index.html')
}

app.on('window-all-closed', () => {
  fs.rmSync("tempfiles/", { recursive: true, force: true });
  app.quit()
})

app.whenReady().then(() => {
    createWindow()
})