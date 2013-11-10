var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    app = express(),
    sio = require('socket.io');

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.send('nodeWHAT!?');
});

var server = http.createServer(app);

var io = sio.listen(server);

server.listen(3000, function (err) {
    if (err) return console.log(err);
});