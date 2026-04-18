const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(`v1 - 안녕하세요! 파드 이름: ${os.hostname()}\n`);
});

server.listen(3000, () => {
  console.log('v1 서버 실행 중 (포트 3000)');
});
