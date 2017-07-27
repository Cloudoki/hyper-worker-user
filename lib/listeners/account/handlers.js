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
            status: 200,
            payload: presenter.toJson(account)
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

    methods.list(msg.payload.meta).then((account) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(account)
        });

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500,
            payload: err
        });
    });

};

exports.add = (msg, done) => {

    methods.add(msg.payload).then((account) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(account)
        });

    }).catch((err) => {

        if (err.code && err.code === 400) {
            done(null, {
                status: 400,
                payload: err.msg
            });
            return
        }

        if (err.code && err.code === "ER_DUP_ENTRY") {
            done(null, {
                status: 409,
                payload: err
            });
            return
        }

        log.error(err);

        done(err, {
            status: 500,
            payload: err
        });

    });

};

exports.update = (msg, done) => {

    methods.update(msg.payload).then((account) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(account)
        });

    }).catch((err) => {

        if (err.code && err.code === "ER_DUP_ENTRY") {
            done(null, {
                status: 409,
                payload: err
            });
            return
        }

        if (err.code && err.code === 404) {
            done(null, {
                status: 404,
                payload: err.msg
            });
            return
        }

        log.error(err);
        done(err, {
            status: 500,
            payload: err
        });
    });

};

exports.delete = (msg, done) => {

    methods.delete(msg.payload).then((account) => {

        done(null, {
            status: 200,
            payload: null
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            done(null, {
                status: 404,
                payload: null
            });
            return
        }

        log.error(err);
        done(err, {
            status: 500,
            payload: err
        });
    });

};