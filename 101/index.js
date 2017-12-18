var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


/** 
* config Express routes 
**/

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/hello', function(req, res){
	res.send('<h1>Hello world</h1>');
});


/** 
* config Scoket.io event listeners 
**/

io.on('connection', function(socket){

	// log new connections
	console.log('a user connected');

	// log disconnection
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	// print new chat messages to console
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
	});

	// emit new messages to all listener clients
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});


/**
* listen to specific ip 
**/

http.listen(3000, '10.0.0.91', function(){
	console.log('listening on *:3000');
});




