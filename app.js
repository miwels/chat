var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){

	socket.on('user connects', function(user){
		io.emit('user connects', user + ' has connected');
	});

	socket.on('user disconnects', function(user){
		io.emit('user disconnects', user);
	});

	socket.on('chat message', function(msg, user){
		io.emit('chat message', msg, user);
	});

	socket.on('user is typing', function(user){
		io.emit('user is typing', user);
	});

	socket.on('user stopped typing', function(user){
		io.emit('user stopped typing', user);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});