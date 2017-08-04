var express = require('express');
var bodyParser = require('body-parser');
var user = require('./routes/user');
var projects = require('./routes/projects');
var label = require('./routes/label');
var io = require('socket.io')(app);
var moment = require('moment');
var app = express();
var server = require('http').Server(app)
app.io = io;
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use('/user', user);
app.use('/projects', projects)
app.use('/label', label);


var sockets = [];
io.on('connection', function(socket){
	var handshakeData = socket.request;
	sockets[handshakeData._query['username']] = socket.id;
	console.log("bfjsbkfbs");
	socket.on('join-group', function(data) {
		io.emit('refresh-online-users', Object.keys(sockets));
	});

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

app.use(function(req, res, next) {
	res.header("access-control-allow-methods", "GET, POST, PUT");
	res.header("Content-Type", "application/json");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();

});

server.listen(port, function() {
  console.log('Server listening on port' + port);
});

module.exports = app;
