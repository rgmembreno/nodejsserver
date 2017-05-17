var express = require('express')
var app = express()
var logger = require('winston')
var expressWinston = require('express-winston')
var bodyParser = require('body-parser')
var nconf = require('nconf').argv().env()

var port = 80

var fileTransportOpts = {
  filename: './server.log',
  maxsize: 10000000,
  maxFiles: 2,
  json: false,
  handleExceptions: true
};

var consoleTransportOpts = {
  colorize: true,
  timestamp :true,
  prettyPrint: true
};

var fileTransport = new logger.transports.DailyRotateFile(fileTransportOpts)
var consoleTransport = new logger.transports.Console(consoleTransportOpts)

expressWinston.requestWhitelist.splice(0, expressWinston.requestWhitelist.length)
expressWinston.requestWhitelist.push('method')
expressWinston.requestWhitelist.push('url')
expressWinston.requestWhitelist.push('query')

var message = "{{res.statusCode}} HTTP {{req.method}} {{req.url}} {{res.responseTime}}ms"
var expressWinstonLogger = expressWinston.logger({
  transports: [fileTransport, consoleTransport],
  msg: message,
  meta: false
});

var expressWinstonErrorLogger = expressWinston.errorLogger({
  transports: [fileTransport, consoleTransport],
  msg: message,
  meta: false
});

app.use(bodyParser.json())
app.use(expressWinstonLogger)
app.use(expressWinstonErrorLogger)

//routes
app.get('/', function (req, res) {
  nconf.set('HELLO_WORLD', 'hello world!')
  res.send('I am doing good, and I want to say ' + nconf.get('THANKS') + ' for ' + (nconf.get('HELLO_WORLD') || 'nothing!'))
})

app.get('/healthCheck', function (req, res) {
  res.send('I am doing good!')
})

app.get('/envvar', function (req, res) {
  res.send('Environment variable value: ' + process.env.TEST_VAR + "," + process.env.NODE_ENV + "," + process.env.NODE_PROTECTED)
})

var server = app.listen(port, function () {
  logger.info('simple server listening on port ' + port)
});
