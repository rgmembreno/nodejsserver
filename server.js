/*jshint -W080 */
var nconf = require('nconf').argv().env();

// Important: Remove default limit of 5
var http = require('http')
http.globalAgent.maxSockets = Infinity
var https = require('https')
https.globalAgent.maxSockets = Infinity

var _ = require('lodash');
var express = require('express');
var app = express();
var logger = require('winston');
var expressWinston = require('express-winston');
var bodyParser = require('body-parser');

var port = 80;

// configure logging.  pretty ugly code but dont know better way yet
var fileTransportOpts = {
  filename: './server.log',
  maxsize: 10000000,
  maxFiles: 2,
  json: false,
  handleExceptions: (process.env.NODE_ENV === 'production')
};

var consoleTransportOpts = {
  colorize: true,
  timestamp :true,
  prettyPrint: true
};

var fileTransport = new logger.transports.DailyRotateFile(fileTransportOpts)
var consoleTransport = new logger.transports.Console(consoleTransportOpts)

// Gives an error when module is installed in integrator for testing
// Add loggers only when not running as a module
if (__dirname.indexOf('node_modules') === -1) {
  logger.remove(logger.transports.Console)
  logger.add(logger.transports.Console, consoleTransportOpts)
  logger.add(logger.transports.DailyRotateFile, fileTransportOpts)
}

expressWinston.requestWhitelist.splice(0, expressWinston.requestWhitelist.length)
expressWinston.requestWhitelist.push('method')
expressWinston.requestWhitelist.push('url')
expressWinston.requestWhitelist.push('query')

var message = "{{res.statusCode}} HTTP {{req.method}} {{req.url}} {{res.responseTime}}ms"
  , expressWinstonLogger = expressWinston.logger(
    { transports: [fileTransport, consoleTransport],
      msg: message,
      meta: false
    }
  )

var expressWinstonErrorLogger = expressWinston.errorLogger(
  { transports: [fileTransport, consoleTransport],
    msg: message,
    meta: false
  }
)

// we need the logs from all our 3rd party modules.
logger.extend(console);
var log = console.log;
console.log = function hijacked_log(level) {
  if (arguments.length > 1 && level in this) {
    log.apply(this, arguments);
  } else {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('info');
    log.apply(this, args);
  }
}

app.use(bodyParser.json())
app.use(expressWinstonLogger)
app.use(expressWinstonErrorLogger)

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
