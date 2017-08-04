'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
		pin: 'role:permission,cmd:get',
		handler: handlers.get
	},
	{
		pin: 'role:permission,cmd:list',
		handler: handlers.list
	}
];