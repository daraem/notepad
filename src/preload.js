const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onCallSave: (callback) => ipcRenderer.on('call-save', () => callback()),
    onCallTemp: (callback) => ipcRenderer.on('call-tempsave', () => callback()),
    onGetTemp: (callback) => ipcRenderer.on('send-tempsaves', (_event, data) => callback(data)),
    saveFile: (data) => ipcRenderer.send('save-file', data),
    tempSave: (data) => ipcRenderer.send('temp-save', data)
})