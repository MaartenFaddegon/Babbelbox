var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var users = {};

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log(users[socket.id] + ' disconnected');
    delete users[socket.id];
  });

  socket.on('chat message', function(msg1){
    user = users[socket.id];
    msg2 = user + "> " + msg1;
    console.log('message: ' + msg2);
    io.emit('chat message', msg2);
  });

  socket.on('join', function(user){
    console.log('joined: ' + user);
    users[socket.id] = user;
  });
});
