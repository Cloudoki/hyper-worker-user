'use strict'

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/permission');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.payload).then((permission) => {

        if (!permission) {
            done(null, {
                status: 404
            });
            return
        }

        done(null, {
            status: 200,
            payload: presenter.toJson(permission)
        });

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500,
            payload: err
        });
    });

};

exports.list = (msg, done) => {

    methods.list(msg.payload.meta).then((permission) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(permission)
        });

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500,
            payload: err
        });
    });

};