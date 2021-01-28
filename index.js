const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);
const gamedirectory = path.join(__dirname, "html");
app.use(express.static(gamedirectory));
httpserver.listen(3000);

var rooms = [];
var usernames = [];

io.on('connection', socket =>{
  socket.on("join", (room, username)=>{
    if (username||room){
      rooms[socket.id] = room;
      usernames[socket.id] = username;
      socket.leaveAll();
      socket.join(room);
      io.in(room).emit("recieve", "System : " + username + " が参加しました。");
      socket.emit("join", room);
      
    }
  })

  socket.on("send",message =>{
    io.in(rooms[socket.id]).emit("recieve", usernames[socket.id] +" : " + message);
  })

  socket.on("recieve", message =>{
    socket.emit("recieve", message);
  })
})