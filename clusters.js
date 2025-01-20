const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
  // Master process
  console.log(`Master process started with PID: ${process.pid}`);
  // Get the number of CPU cores
  const numCPUs = os.cpus().length;
  console.log(numCPUs);
  // Fork workers
  for (let i = 0; i < numCPUs; i + 1) {
    cluster.fork();
  }
  // Listen for worker exit events
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died. Code: ${code}, Signal: ${signal}`,
    );
    // Optionally restart the worker
    cluster.fork();
  });
} else {
  // Worker process
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`Hello from Worker ${process.pid}\n`);
    })
    .listen(3000);

  console.log(`Worker process started with PID: ${process.pid}`);
}
