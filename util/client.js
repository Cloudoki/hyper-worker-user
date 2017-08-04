'use strict'

const seneca = require('seneca')()
    .use('seneca-amqp-transport');

const config = require('config');
const log = require('util/logger');

exports = module.exports = {};

const roles = [
    require('lib/listeners/user'),
    require('lib/listeners/account'),
    require('lib/listeners/role'),
    require('lib/listeners/permission'),
    require('lib/listeners/verification'),
    require('lib/listeners/ping')
];

for (let role of roles) {
    for (let listener of role.listeners) {
        seneca.add(listener.pin, listener.handler);
    }
}

seneca.listen(config.get('seneca').client).client(config.get('seneca').client);

exports.seneca = seneca;