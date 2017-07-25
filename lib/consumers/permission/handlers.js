'use strict'

const log = require('log');
const methods = require('./methods');
const presenter = require('../../presenters/permission');

exports = module.exports = {};

exports.get = (msg, reply) => {

    methods.get(msg.payload).then((permission) => {

        if (!permission) {
            reply({
                status: 404
            });
            return
        }

        reply({
            status: 200,
            payload: presenter.toJson(permission)
        });

    }).catch((err) => {
        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};

exports.list = (msg, reply) => {

    methods.list(msg.payload.meta).then((permission) => {

        reply({
            status: 200,
            payload: presenter.toJson(permission)
        });

    }).catch((err) => {
        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};