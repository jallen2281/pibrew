var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});

server.listen(8081, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message
	console.log("Received:"+message);
	    connection.send("Back at ya!");
    }
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});

const express = require('express')
const app = express()
const port = 8080 
const path=require('path');

app.use('/', express.static(__dirname + '/../frontend/'));

//app.get('/', (req, res) => {
//	res.send("Helo World");
//	res.sendFile(path.join(__dirname + '/../frontend/','frontend','index.html'));
//})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
