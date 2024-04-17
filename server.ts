import * as http from 'http';
import * as WebSocket from 'ws';
import * as exec from './exec';
import { log, logUpgr } from './log';

const wss = new WebSocket.Server({ noServer: true });

type WssServer = http.Server & {
    wss?: WebSocket.Server
}

const server: WssServer = http.createServer(
  { maxHeaderSize: 1024 * 8 },
  log(async (rq, rs) => {
    if (rq.method !== 'GET') {
        rs.writeHead(405, 'Method Not Allowed');
    } else {
        rs.writeHead(404, 'Not Found');
    }
    rs.end();
  })
);

server.wss = wss;

server.on('upgrade', logUpgr(async (rq, s, h) => {
    if (rq.headers.upgrade === 'websocket') {
        if (rq.url.startsWith('/myservice/exec')) {
            await exec.upgrade(rq, s, h, server);
        } else {
            s.end('HTTP/1.1 400 Bad Request\r\n\r\n')
        }
    } else {
        s.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    }
}))

export default server;