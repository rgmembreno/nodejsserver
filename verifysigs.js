var nconf = require('nconf').argv().env()
var util = require('util')
var crypto = require('crypto')
var logger = require('winston')

module.exports = {
  callVerify: function(options) {
    var verifier = crypto.createVerify('RSA-SHA1')
    verifier.update(options.data)
    var result = false
    var key = nconf.get('PUB_KEY_MODULE') || nconf.get('PUB_KEY_BASE') || undefined
    try {
        result = verifier.verify(key, options.provided, 'base64')
    } catch (e) {
        logger.error('e=' + util.inspect(e, {depth: null}))
        logger.info('nconf (server js) is set?', nconf.get('PUB_KEY_BASE') ? 'yes' : 'no')
        logger.info('nconf (module) is set?', nconf.get('PUB_KEY_MODULE') ? 'yes' : 'no')
        logger.info('options is set', options ? 'yes' : 'no')
        logger.info('provided is set', options.provided ? 'yes' : 'no')
    }
    return result
  }
}