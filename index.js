'use strict'

const seneca = require('seneca')()
    .use('seneca-amqp-transport');

const config = require('config');
const log = require('util/logger');

const roles = [
    require('lib/listeners/user'),
    require('lib/listeners/account'),
    require('lib/listeners/role'),
    require('lib/listeners/permission'),
    require('lib/listeners/verification')
];

let pins = [];

for (let role of roles) {
    for (let listener of role.listeners) {
        seneca.add(listener.pin, listener.handler);
        pins.push[listener.pin];
    }
}

seneca.listen({
    type: 'amqp',
    pin: pins,
    name: 'hyper.multi-task.queue',
    url: config.queue.uri
  });