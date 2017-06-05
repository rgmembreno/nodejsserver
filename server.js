'use strict'
var nconf = require('nconf').argv().env()

if (process.env.ON_AWS !== 'yes') nconf.file('env.json')
nconf.set('GOODDAY', 'hello')
var helloWorld = nconf.get('GOODDAY') + ' ' + nconf.get('PERSON') + '!'
nconf.set('PUB_KEY_BASE', '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvtjdLkS+FP+0fPC09j25\ny/PiuYDDivIT86COVedvlElk99BBYTrqNaJybxjXbIZ1Q6xFNhOY+iTcBr4E1zJu\ntizF3Xi0V9tOuP/M8Wn4Y/1lCWbQKlWrNQuqNBmhovF4K3mDCYswVbpgTmp+JQYu\nBm9QMdieZMNry5s6aiMA9aSjDlNyedvSENYo18F+NYg1J0C0JiPYTxheCb4optr1\n5xNzFKhAkuGs4XTOA5C7Q06GCKtDNf44s/CVE30KODUxBi0MCKaxiXw/yy55zxX2\n/YdGphIyQiA5iO1986ZmZCLLW8udz9uhW5jUr3Jlp9LbmphAC61bVSf4ou2YsJaN\n0QIDAQAB\n-----END PUBLIC KEY-----')
logger.info('nconf was set in server js?', nconf.get('PUB_KEY_BASE') ? 'yes' : 'no')
// Other modules
var express = require('express')
var app = express()
var logger = require('winston')
var expressWinston = require('express-winston')
var bodyParser = require('body-parser')
var checksigs = require('./checksigs')

var port = 80

var fileTransportOpts = {
  filename: './server.log',
  maxsize: 10000000,
  maxFiles: 2,
  json: false,
  handleExceptions: true
}

var consoleTransportOpts = {
  colorize: true,
  timestamp :true,
  prettyPrint: true
}


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
  res.send('I am doing something...' + helloWorld)
})

app.get('/healthCheck', function (req, res) {
  res.send('I am doing good!')
})

app.get('/envvar', function (req, res) {
  res.send('Environment variable value: ' + process.env.TEST_VAR + "," + process.env.NODE_ENV + "," + process.env.NODE_PROTECTED)
})

app.get('/verify', function (req, res) {
  var options = {}
  options.data = new Buffer('{"id":233320341,"repository":{"id":7903758,"name":"nodejsserver","owner_name":"rgmembreno","url":null},"number":"1","config":{"sudo":false,"language":"node_js","node_js":["0.12.7"],"script":["make -f .travis test"],"notifications":{"webhooks":"http://requestb.in/18uaooo1"},".result":"configured","group":"stable","dist":"precise"},"status":1,"result":1,"status_message":"Failed","result_message":"Failed","started_at":"2017-05-17T17:07:54Z","finished_at":"2017-05-17T17:08:40Z","duration":46,"build_url":"https://travis-ci.org/rgmembreno/nodejsserver/builds/233320341","commit_id":67559042,"commit":"3ddf4bfde685961b835f022a90a882b0d34b6a78","base_commit":null,"head_commit":null,"branch":"master","message":"test build for travis-org","compare_url":"https://github.com/rgmembreno/nodejsserver/compare/f0c3335915a2...3ddf4bfde685","committed_at":"2017-05-17T17:06:56Z","author_name":"Roger Membreno","author_email":"rgmembreno@gmail.com","committer_name":"Roger Membreno","committer_email":"rgmembreno@gmail.com","matrix":[{"id":233320342,"repository_id":7903758,"parent_id":233320341,"number":"1.1","state":"finished","config":{"sudo":false,"language":"node_js","node_js":"0.12.7","script":["make -f .travis test"],"notifications":{"webhooks":"http://requestb.in/18uaooo1"},".result":"configured","group":"stable","dist":"precise","os":"linux"},"status":1,"result":1,"commit":"3ddf4bfde685961b835f022a90a882b0d34b6a78","branch":"master","message":"test build for travis-org","compare_url":"https://github.com/rgmembreno/nodejsserver/compare/f0c3335915a2...3ddf4bfde685","started_at":"2017-05-17T17:07:54Z","finished_at":"2017-05-17T17:08:40Z","committed_at":"2017-05-17T17:06:56Z","author_name":"Roger Membreno","author_email":"rgmembreno@gmail.com","committer_name":"Roger Membreno","committer_email":"rgmembreno@gmail.com","allow_failure":false}],"type":"push","state":"failed","pull_request":false,"pull_request_number":null,"pull_request_title":null,"tag":null}')
  options.provided = 'UmMMIejjJE1TKc2kSybMdGtR8Y6Z52lGK08v9SfOAIGttLOLIsN4bw3sjaYl43MZP4xIroH91XN9bVUCovlr7CDYonpM2++2wAb6ZEl4Sa96d0Bz2Zyr/7bZXTAEHUeXfEYqFRI8BbD4CjVpTCw7OF/1bYR+Gg7UzE5DrKy1z9iGeNEXcD5yrT4qBvNatFia0m9ZwsEi6KiFAtYCFVEtSVD64D23b8wH/upQ0IUanZSUtf4Ji4qhQxIp2Ah4T2YJJtZRJa8DICsI/KEI3zphKaq0mR7ULDW3GLDmYLITX17kOR2OxDfpgnsLur03xANKx7bQlcXggfIKDc298tmE/w=='
  var result = checksigs.signatureCheck(options)
  var resText = 'Signature is valid: ' + result + ', nconf (server js) is set? ' + (nconf.get('PUB_KEY_BASE') ? 'yes' : 'no') + ', nconf (module) is set? ' + (nconf.get('PUB_KEY_MODULE') ? 'yes' : 'no')
  res.send(resText)
})

var server = app.listen(port, function () {
  logger.info('simple server listening on port ' + port)
});
