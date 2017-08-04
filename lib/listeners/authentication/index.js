'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.listeners = [{
        pin: 'role:authentication,cmd:hash',
        handler: handlers.hash
    },
    {
        pin: 'role:authentication,cmd:login',
        handler: handlers.login
    },
    {
        pin: 'role:authentication,cmd:validateLoginToken',
        handler: handlers.validateLoginToken
    }
];