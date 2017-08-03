'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
    pin: 'role:role,cmd:get',
    handler: handlers.get
  },
  {
    pin: 'role:role,cmd:list',
    handler: handlers.list
  },
  {
    pin: 'role:role,cmd:add',
    handler: handlers.add
  },
  {
    pin: 'role:role,cmd:update',
    handler: handlers.update
  },
  {
    pin: 'role:role,cmd:delete',
    handler: handlers.delete
  },
  {
    pin: 'role:role,cmd:permission-add',
    handler: handlers.addPermission
  },
  {
    pin: 'role:role,cmd:permission-remove',
    handler: handlers.removePermission
  }
];