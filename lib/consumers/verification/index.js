'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.consumers = [{
  queue: {
    name: 'hyper.user.allow',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.allow
}];