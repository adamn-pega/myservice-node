const mem = ['file1.txt', 'file2.txt'];
const data = [
`This is file1 content
# comments starts with #
data1 = "###"
`, 
`This is file2 content
data2 = "ddd#"
`
];

export const upgrade = async (rq, s, h, server) => {
  server.wss.handleUpgrade(rq, s, h, (ws) => {
    ws.on('message', msg => {
      console.log(`command: ${msg}`)
      // ls command
      if (msg == "<ls>") {
        let files = "";
        // create response
        mem.forEach(f => {
          if (files.length == 0) {
            files += f
          } else {
            files += ", " + f;
          }
        });
        // send response
        ws.send(files); 
      } 
      // get command
      else if (`${msg}`.startsWith("<get ")) {
        // get file name
        let file = `${msg}`.split("<get ")[1].slice(0, -1);
        // get file data
        let d = '';
        data[mem.indexOf(file)].split('\n').forEach(l => {
          if (l.startsWith('#')) {
            // ommit a comment
          } else {
            d += l + "\n";
          }
        })
        // send response
        ws.send(d);
      }
      // unsupported command
      else {
        ws.send('<unknown command>')
      }
    });
    ws.send('Hello');
  });
};