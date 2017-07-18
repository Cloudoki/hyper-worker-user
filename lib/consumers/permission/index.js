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
},
{
  queue: {
    name: 'hyper.permission.add',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.add
},
{
  queue: {
    name: 'hyper.permission.update',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.update
},
{
  queue: {
    name: 'hyper.permission.delete',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.delete
}];