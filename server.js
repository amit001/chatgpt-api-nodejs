const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);
console.log(`Server is listening at PORT:-${port}`)
server.listen(port);

module.exports = { server };