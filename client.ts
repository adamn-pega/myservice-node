import * as WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:10000/myservice/exec');

function test(ws) {
  console.log("Sending <ls> command");
  ws.send("<ls>");
  setTimeout(() => {}, 1000);
  console.log("Sending <get file1.txt> command");
  ws.send("<get file1.txt>");
  setTimeout(() => {}, 1000);
  console.log("Sending <get file2.txt> command");
  ws.send("<get file2.txt>");
  setTimeout(() => {}, 1000);
  ws.send("<save file3.txt>");
  setTimeout(() => {}, 1000);
}

ws.on('open', () => {
  console.log('Connected to server');
  test(ws);
});

ws.on('message', (msg) => {
  console.log(`Received message from server: ${msg}`);
});

ws.on('close', () => {
  console.log('Disconnected from server');
});
