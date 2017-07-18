'use strict'

const config = require('config');
const log = require('log');
const mq = require('hyper-queue');

<<<<<<< HEAD
const config = require('config');
const log = require('log');

const user = require('lib/consumers/user');
=======
const placeholder = require('lib/consumers/placeholder');

mq.logger(log);
>>>>>>> 0814759e7fce422d6138aa6e8df1a721cee4f53a

const account = require('lib/consumers/account');

const role = require('lib/consumers/role');

const permission = require('lib/consumers/permission');

<<<<<<< HEAD
mq.logger(log);

mq.broker(config.queue.uri, config.queue.options, config.queue.reconnect);

mq.registerConsumers(user.consumers);

mq.registerConsumers(account.consumers);

mq.registerConsumers(role.consumers);

mq.registerConsumers(permission.consumers);
=======
mq.registerCconsumers(placeholder.consumers);
>>>>>>> 0814759e7fce422d6138aa6e8df1a721cee4f53a

mq.connect();
