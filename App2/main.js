const { app, BrowserWindow } = require('electron')

let win = null;
let winChild = null;

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 });
  // win.loadURL('https://github.com');
  win.loadFile('index.html')
});
