/*const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on('ready', () => {
  // mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
  mainWindow = new BrowserWindow({width: 1000, height: 700});
  // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
  mainWindow.loadURL('file://' + __dirname + '/index.html');


// mainWindow.setOverlayIcon(`file://${__dirname}/msoft.png`, 'Description for overlay')

  // ChromiumのDevツールを開く
//  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
    process.exit();
  });
});*/
const { app, BrowserWindow } = require("electron");
 
var initialize = function () {
  var win = new BrowserWindow({width: 1300,height: 600,});
  win.loadFile("./index.html");
};
 
app.whenReady().then(initialize);