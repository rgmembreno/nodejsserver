var express = require('express');
var app = express();
var logger = require('winston');

var port = 80;

// var nconf = require('nconf').argv().env();

//routes
app.get('/', function (req, res) {
  res.send('I am doing good!')
})

app.get('/healthCheck', function (req, res) {
  res.send('I am doing good!')
})

app.get('/envvar', function (req, res) {
  res.send('Environment variable value: ' + process.env.TEST_VAR)
})

var server = app.listen(port, function () {
  logger.info('simple server listening on port ' + port);
});
