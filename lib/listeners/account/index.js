'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
    pin: 'role:account,cmd:get',
    handler: handlers.get
  },
  {
    pin: 'role:account,cmd:list',
    handler: handlers.list
  },
  {
    pin: 'role:account,cmd:add',
    handler: handlers.add
  },
  {
    pin: 'role:account,cmd:update',
    handler: handlers.update
  },
  {
    pin: 'role:account,cmd:delete',
    handler: handlers.delete
  }
];