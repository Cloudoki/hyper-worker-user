'use strict'

const handlers = require('./handlers');

exports = module.exports = {};

exports.uGet = (msg, done) => {
    msg.data.superAdmin = false;
    handlers.get(msg, done);
};

exports.uList = (msg, done) => {
    handlers.list(msg, done, false);
};

exports.uAdd = (msg, done) => {
    msg.data.password = 'a';
    msg.data.superAdmin = false;
    handlers.add(msg, done);
};

exports.uUpdate = (msg, done) => {
    msg.data.superAdmin = false;
    handlers.update(msg, done);
};

exports.uDelete = (msg, done) => {
    msg.data.superAdmin = false;
    handlers.delete(msg, done);
};

exports.uAddAccount = (msg, done) => {
    msg.data.superAdmin = false;
    handlers.addAccount(msg, done);
};

exports.uRemoveAccount = (msg, done) => {
    msg.data.superAdmin = false;
    handlers.removeAccount(msg, done);
};

exports.saGet = (msg, done) => {
    msg.data.superAdmin = true;
    handlers.get(msg, done);
};

exports.saList = (msg, done) => {
    handlers.list(msg, done, true);
};

exports.saAdd = (msg, done) => {
    msg.data.password = 'a';
    msg.data.superAdmin = true;
    handlers.add(msg, done);
};

exports.saUpdate = (msg, done) => {
    msg.data.superAdmin = true;
    handlers.update(msg, done);
};

exports.saDelete = (msg, done) => {
    msg.data.superAdmin = true;
    handlers.delete(msg, done);
};

exports.saAddAccount = (msg, done) => {
    msg.data.superAdmin = true;
    handlers.addAccount(msg, done);
};

exports.saRemoveAccount = (msg, done) => {
    msg.data.superAdmin = true;
    handlers.removeAccount(msg, done);
};