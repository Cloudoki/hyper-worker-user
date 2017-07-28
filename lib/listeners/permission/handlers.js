'use strict'

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/permission');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.payload).then((permission) => {

        if (!permission) {
            done(null, {
                err: null,
                status: 404,
                data: null
            });
            return
        }

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(permission)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err,
            status: 500,
            data: err
        });
    });

};

exports.list = (msg, done) => {

    methods.list(msg.payload.meta).then((permission) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(permission)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err,
            status: 500,
            data: err
        });
    });

};