import http from 'http';
import https from 'https';
import sockjs from 'sockjs';

import {host, isHttps, port, wsPath} from './args';

const wsServer = sockjs.createServer({heartbeat_delay: 5000});
wsServer.on('connection', function (conn) {
  server.on('data', function (message) {
    conn.write(message);
  });
  conn.on('close', function () {
    console.info('server connection closed');
  });
});

const server = isHttps ? https.createServer() : http.createServer();

server.addListener('request', function (req, res) {
  // do something here
});
server.addListener('upgrade', function (req, res) {
  res.end();
});

wsServer.installHandlers(server, {prefix: wsPath});
server.listen(port, host);
