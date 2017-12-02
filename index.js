const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

server.listen(3000, '0.0.0.0', () => {
  const { port, address } = server.address();

  console.log(`Server started on ${address}: ${port}`);
});
