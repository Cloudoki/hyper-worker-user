'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.consumers = [{
    queue: {
      name: 'hyper.permission.get',
      options: {
        durable: false
      }
    },
    async: false,
    handler: handlers.get
  },
  {
    queue: {
      name: 'hyper.permission.list',
      options: {
        durable: false
      }
    },
    async: false,
    handler: handlers.list
  }
];