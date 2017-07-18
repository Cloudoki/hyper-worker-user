'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.consumers = [{
  queue: {
    name: 'hyper.account.get',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.get
},
{
  queue: {
    name: 'hyper.account.list',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.list
},
{
  queue: {
    name: 'hyper.account.add',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.add
},
{
  queue: {
    name: 'hyper.account.update',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.update
},
{
  queue: {
    name: 'hyper.account.delete',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.delete
}];