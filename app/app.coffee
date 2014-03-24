
express = require 'express'
log     = require('debug') 'nx-echoserver'
http    = require('http');

app     = express()
server  = http.createServer app

io = require('socket.io').listen server
fs = require('fs')

io.sockets.on 'connection', (socket) ->
  console.log 'socket conneted'



if module.parent
  module.exports = server
else
  port = process.env.PORT || 9999
  server.listen port, ->
    log 'Server started on ' + port