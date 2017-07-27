'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
    pin: 'role:role.get',
    handler: handlers.get
  },
  {
    pin: 'role:role.list',
    handler: handlers.list
  },
  {
    pin: 'role:role.add',
    handler: handlers.add
  },
  {
    pin: 'role:role.update',
    handler: handlers.update
  },
  {
    pin: 'role:role.delete',
    handler: handlers.delete
  },
  {
    pin: 'role:role.permission-add',
    handler: handlers.addPermission
  },
  {
    pin: 'role:role.permission-remove',
    handler: handlers.removePermission
  }
];