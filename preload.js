const { contextBridge, ipcRenderer } = require('electron');

// Expose a minimal, safe API to the renderer windows.
contextBridge.exposeInMainWorld('vision20', {
  // Control window -> main
  startCycle: () => ipcRenderer.send('cycle:start'),
  stopCycle: () => ipcRenderer.send('cycle:stop'),
  requestStatus: () => ipcRenderer.send('status:request'),

  // Break window -> main
  breakDone: () => ipcRenderer.send('break:done'),
  breakSkip: () => ipcRenderer.send('break:skip'),

  // main -> renderers
  onStatusUpdate: (cb) => ipcRenderer.on('status:update', (_e, data) => cb(data)),
  onBreakStart: (cb) => ipcRenderer.on('break:start', (_e, data) => cb(data)),
});
