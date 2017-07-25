'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.consumers = [{
  queue: {
    name: 'hyper.role.get',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.get
},
{
  queue: {
    name: 'hyper.role.list',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.list
},
{
  queue: {
    name: 'hyper.role.add',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.add
},
{
  queue: {
    name: 'hyper.role.update',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.update
},
{
  queue: {
    name: 'hyper.role.delete',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.delete
},
{
  queue: {
    name: 'hyper.role.permission.add',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.addPermission
},
{
  queue: {
    name: 'hyper.role.permission.remove',
    options: {
      durable: false
    }
  },
  async: false,
  handler: handlers.removePermission
}];