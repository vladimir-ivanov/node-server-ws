import http, {type IncomingMessage, type ServerResponse} from 'http';
import https from 'https';
import WebSocket from 'ws';

import {host, isHttps, port, wsPath} from './args';
function handleConnected() {
  console.log('Connected to client ...');
}
function handleMessage(ws: any, data: string) {
  console.warn(data);
}
function handleError(e: Event | ErrorEvent) {
  console.log(e instanceof ErrorEvent ? e.message : 'unhandled error');
}
function handleClose() {
  console.log('socket closed');
}
const serverConfig = (request: IncomingMessage, response: ServerResponse) => {
  const pathname = request?.url;
  switch (pathname) {
    case wsPath:
      {
        const websocket = new WebSocket.Server({port});

        websocket.on('connection', (ws, request) => {
          handleConnected();
          ws.emit('hi client');
          ws.on('message', (data: string) => {
            console.log(`Client has sent us: ${data}`);
            handleMessage(ws, JSON.parse(data));
          });
          ws.on('close', handleClose);
          ws.on('error', handleError);
        });
      }

      break;
    case '/':
      response.setHeader('Content-Type', 'application/json');
      response.end('{message: "ok"}');
      break;
    default:
      response.statusCode = 404;
      response.end('Not found');
      break;
  }
};

const server = isHttps ? https.createServer(serverConfig) : http.createServer(serverConfig);
server.listen(port, host);
console.info('Listening on: ' + `${host}:${port}`);
