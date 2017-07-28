'use strict'

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/user');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.payload).then((user) => {

        if (!user) {
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
            data: presenter.toJson(user)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err,
            status: 500,
            data: null
        });
    });

};

exports.list = (msg, done) => {

    methods.list(msg.meta).then((user) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(user)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err,
            status: 500,
            data: null
        });
    });

};

exports.add = (msg, done) => {

    msg.payload.password = 'a';
    msg.payload.superAdmin = false;

    methods.add(msg.payload).then((user) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(user)
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
            data: null
        });

    });

};

exports.update = (msg, done) => {

    methods.update(msg.payload).then((user) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(user)
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            done(null, {
                err: null,
                status: 404,
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
            data: null
        });
    });

};

exports.delete = (msg, done) => {

    methods.delete(msg.payload).then((user) => {

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
            data: null
        });
    });

};

exports.addAccount = (msg, done) => {

    methods.addAccount(msg.payload).then((user) => {

        done(null, {
            err: null,
            status: 200,
            data: "user associated to account"
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
            data: null
        });
    });

};

exports.removeAccount = (msg, done) => {

    methods.removeAccount(msg.payload).then((user) => {

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
            data: null
        });
    });

};