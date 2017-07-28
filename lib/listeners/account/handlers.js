'use strict'

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/account');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.payload).then((account) => {

        if (!account) {
            done(null, {
                status: 404
            });
            return
        }

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(account)
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

    methods.list(msg.payload.meta).then((account) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(account)
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

exports.add = (msg, done) => {

    methods.add(msg.payload).then((account) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(account)
        });

    }).catch((err) => {

        if (err.code && err.code === 400) {
            done(null, {
                err: null,
                status: 400,
                data: err.msg
            });
            return
        }

        if (err.code && err.code === "ER_DUP_ENTRY") {
            done(null, {
                err: null,
                status: 409,
                data: err
            });
            return
        }

        log.error(err);

        done(null, {
            err: err,
            status: 500,
            data: err
        });

    });

};

exports.update = (msg, done) => {

    methods.update(msg.payload).then((account) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(account)
        });

    }).catch((err) => {

        if (err.code && err.code === "ER_DUP_ENTRY") {
            done(null, {
                err: null,
                status: 409,
                data: err
            });
            return
        }

        if (err.code && err.code === 404) {
            done(null, {
                err: null,
                status: 404,
                data: err.msg
            });
            return
        }

        log.error(err);
        done(null, {
            err: err,
            status: 500,
            data: err
        });
    });

};

exports.delete = (msg, done) => {

    methods.delete(msg.payload).then((account) => {

        done(null, {
            err: null,
            status: 200,
            data: null
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            done(null, {
                err: null,
                status: 404,
                data: null
            });
            return
        }

        log.error(err);
        done(null, {
            err: err,
            status: 500,
            data: err
        });
    });

};