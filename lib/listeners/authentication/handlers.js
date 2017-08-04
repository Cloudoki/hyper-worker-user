'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');

exports = module.exports = {};

exports.hash = (msg, done) => {
  methods.hash(msg.data)
  .then((hash) => {
    done(null, {
      data: hash
    })
  }).catch((err) => {
    log.error(err)
    done(null, {
      err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
    })
  })
};

exports.login = (msg, done) => {
  methods.login(msg.data.username, msg.data.password)
  .then((user) => {
    done(null, {
      data: user
    })
  }).catch((err) => {
    log.error(err)
    done(null, {
      err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
    })
  })
};

exports.validateLoginToken = (msg, done) => {
  methods.validateLoginToken(msg.data.token)
  .then((valid) => {
    done(null, {
      data: valid
    })
  }).catch((err) => {
    log.error(err)
    done(null, {
      err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
    })
  })
};