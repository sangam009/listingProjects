'use strict';

var http = require('http');
var path = require('path');
var util = require('util');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var app = express();
var router = express.Router();

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));
  
app.use(router);
app.use(function (req, res, next) {
    res.sendStatus(404);
});

require('./routes')(router);

var port = normalizePort(process.env.PORT || ((process.env.NODE_ENV === 'staging') ? 3000 : 9968));
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  util.log('application listening on ' + bind);
}

http.globalAgent.maxSockets = 3000;
