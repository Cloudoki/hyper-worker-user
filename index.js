'use strict'

const mq = require('hyper-queue');

const config = require('config');
const log = require('log');

const user = require('lib/consumers/user');

const account = require('lib/consumers/account');

const role = require('lib/consumers/role');

const permission = require('lib/consumers/permission');

const verification = require('lib/consumers/verification');

mq.logger(log);

mq.broker(config.queue.uri, config.queue.options, config.queue.reconnect);

mq.registerConsumers(user.consumers);

mq.registerConsumers(account.consumers);

mq.registerConsumers(role.consumers);

mq.registerConsumers(permission.consumers);

mq.registerConsumers(verification.consumers);

mq.connect();
