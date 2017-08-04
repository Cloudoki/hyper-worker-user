'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
    pin: 'role:userWorker,cmd:ping',
    handler: handlers.get
  }
];