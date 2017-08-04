'use strict'

const userModel = require('lib/models/user');

exports = module.exports = {};

exports.ping = () => {
    return userModel.forge().fetch();
};
