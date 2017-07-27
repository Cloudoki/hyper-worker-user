'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
  pin: 'role:user,cmd:allow',
  handler: handlers.allow
}];