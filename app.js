var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function(socket){

	socket.on('user connects', function(nickname){
		io.emit('user connects', nickname + ' has connected');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});