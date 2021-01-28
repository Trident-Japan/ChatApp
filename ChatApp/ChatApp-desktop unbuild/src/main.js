
const { app, BrowserWindow } = require("electron");
 
var initialize = function () {
  var win = new BrowserWindow({width: 1300,height: 600,});
  win.loadFile("./index.html");
};
 
app.whenReady().then(initialize);
