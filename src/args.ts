import minimist from 'minimist';

const {
  host = 'localhost',
  port = 4000,
  sockjs = false,
  wsPath = 'ws',
  isHttps = false,
} = minimist<{port?: number; host?: string; sockjs?: boolean; wsPath?: string; isHttps?: boolean}>(
  process.argv.slice(2)
);

export {host, isHttps, port, sockjs, wsPath};
