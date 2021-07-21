var WebSocketServer = require('websocket').server;
var http = require('http');
var pump = require('./pumpcontrol.js');

var server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});

server.listen(8081, function () { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function (message) {
    //if (message.type === 'utf8') {
    // process WebSocket message

    //console.log(message.utf8Data);
    try {
      message = JSON.parse(message.utf8Data);
    } catch (string) {
      console.log(string);
      return;
    }

    if (message.actor === "undefined") {
      console.log('Undef error::' + message.actor);
    }
    if (message.actor.match(/pumpctl/i)) {
      pump.pumpctl(message.pumpId,message.flow,message.state);
      console.log("pump code launched.");
    }
    console.log(message.actor);
    connection.send("connected");
    //}
  });

  const sensor = require('ds18b20-raspi');

  //clean up on connection close
  var tempInterval = setInterval(() => {
    sensor.readAllF((err, temps) => {
      if (err) {
        console.log(err);
      } else {
        //temps['type']='temp';//gets lost when calling json.stringify. That uses it's own method.
        //console.log(temps);
        //console.log(JSON.stringify({'type':'temp',temps}));
        connection.send(JSON.stringify({ 'type': 'temp', temps }));
      }
    });

  }, 5000);

  connection.on('close', function (connection) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    clearInterval(tempInterval);
    // close user connection
  });
});

const express = require('express')
const app = express()
const port = 8080
const path = require('path');

app.use('/', express.static(__dirname + '/../www/'));
/*
app.get('/', (req, res) => {
  res.send("Helo World");
//	res.sendFile(path.join(__dirname + '/../frontend/','frontend','index.html'));
})
*/


app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})
