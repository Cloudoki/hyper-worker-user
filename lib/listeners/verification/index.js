'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
	pin: 'role:authorization,cmd:get',
	handler: handlers.allow
}];