'use strict';

const director = require('director');

// Server changes 6/3/22 - uncomment and remove block to revert
//const Server   = require('./lib/server');
const http = require('http');
const Bot  = require('./lib/bot');

// Create a router for GET and POST requests to the app
// const router = new director.http.Router({
//     '/': {
//         post: Bot.respond, //Server.postResponse,
//         get: ping //Server.getResponse
//     }
// });

//Server changes 6/3/22 - remove block to revert
const server = http.createServer((req, res) => {
    req.chunks = [];
    console.log("Incoming data");
    req.on('data', chunk => {
      req.chunks.push(chunk.toString());
      console.log(chunk.toString());
      const requestMessage = JSON.parse(chunk);
      Bot.respond(requestMessage);
    });

    // router.dispatch(req, res, err => {
    //   res.writeHead(err.status, {"Content-Type": "text/plain"});
    //   res.end(err.message);
    // });
  });

// Server changes 6/3/22 - remove to revert  
const port = Number(process.env.PORT || 5000);

// Check if the `--dev` flag was passed
const devMode = process.argv[2] === '--dev';

// Server changes 6/3/22 - switch comments to revert
server.listen(port);
// Start listening
//const server = new Server(router, devMode, process.env.PORT);
//server.serve();

// for get
function ping() {
    this.res.writeHead(200);
    this.res.end("Bot running.");
}