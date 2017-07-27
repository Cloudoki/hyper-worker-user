'use strict'

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/user');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.payload).then((user) => {

        if (!user) {
            done(null, {
                status: 404
            });
            return
        }

        done(null, {
            status: 200,
            payload: presenter.toJson(user)
        });

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500
        });
    });

};

exports.list = (msg, done) => {

    methods.list(msg.meta).then((user) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(user)
        });

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500
        });
    });

};

exports.add = (msg, done) => {

    msg.payload.password = 'a';
    msg.payload.superAdmin = false;

    methods.add(msg.payload).then((user) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(user)
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
            status: 500
        });

    });

};

exports.update = (msg, done) => {

    methods.update(msg.payload).then((user) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(user)
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            done(null, {
                status: 404,
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
            status: 500
        });
    });

};

exports.delete = (msg, done) => {

    methods.delete(msg.payload).then((user) => {

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
            status: 500
        });
    });

};

exports.addAccount = (msg, done) => {

    methods.addAccount(msg.payload).then((user) => {

        done(null, {
            status: 200,
            payload: "user associated to account"
        });

    }).catch((err) => {

        if (err.code && err.code === 400) {
            done(null, {
                status: 400,
                payload: err.msg
            });
            return
        }

        if (err.code && err.code === 404) {
            done(null, {
                status: 404,
                payload: null
            });
            return
        }

        log.error(err);
        done(err, {
            status: 500
        });
    });

};

exports.removeAccount = (msg, done) => {

    methods.removeAccount(msg.payload).then((user) => {

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
            status: 500
        });
    });

};