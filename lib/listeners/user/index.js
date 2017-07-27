'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
    pin: 'role:user,cmd:get',
    handler: handlers.get
  },
  {
    pin: 'role:user,cmd:list',
    handler: handlers.list
  },
  {
    pin: 'role:user,cmd:add',
    handler: handlers.add
  },
  {
    pin: 'role:user,cmd:update',
    handler: handlers.update
  },
  {
    pin: 'role:user,cmd:delete',
    handler: handlers.delete
  },
  {
    pin: 'role:user,cmd:account-add',
    handler: handlers.addAccount
  },
  {
    pin: 'role:user,cmd:account-remove',
    handler: handlers.removeAccount
  }
];