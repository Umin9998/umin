var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var dt = require('./module_test.js');

http
  .createServer(function (req, res) {
    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    // If the response from the HTTP server is supposed to be displayed as HTML, you should include an HTTP header with the correct content type:
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    // [Read the Query String]
    // The function passed into the http.createServer() has a req argument that represents the request from the client, as an object (http.IncomingMessage object).
    // This object has a property called "url" which holds the part of the url that comes after the domain name:
    //res.write(req.url);
    // [Split the Query String]
    //var q = url.parse(req.url, true).query;
    //var txt = q.year + ' ' + q.month; // ?year=2017&month=July
    //res.write('\r\n' + txt + '\r\n');
    //res.end(txt);
    //res.write('The date and time are currently: ' + dt.myDateTime());
    //res.end('\r\nHello World!\r\n');

    //Create an event handler:
    var myEventHandler = function () {
      console.log('I hear a scream!');
    };

    //Assign the event handler to an event:
    eventEmitter.on('scream', myEventHandler);

    //Fire the 'scream' event:
    eventEmitter.emit('scream');

    fs.readFile('./src/server/test/index_test.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  })
  .listen(3000);
