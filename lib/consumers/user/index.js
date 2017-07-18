'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.consumers = [{
  queue: {
    name: 'hyper.user.get',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.get
},
{
  queue: {
    name: 'hyper.user.list',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.list
},
{
  queue: {
    name: 'hyper.user.add',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.add
},
{
  queue: {
    name: 'hyper.user.update',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.update
},
{
  queue: {
    name: 'hyper.user.delete',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.delete
}];