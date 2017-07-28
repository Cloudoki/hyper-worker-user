'use strict'

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/role');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.payload).then((role) => {

        if (!role) {
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
            data: presenter.toJson(role)
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

    methods.list(msg.payload.meta).then((role) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(role)
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

    methods.add(msg.payload).then((role) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(role)
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

    methods.update(msg.payload).then((role) => {

        done(null, {
            err: null,
            status: 200,
            data: presenter.toJson(role)
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

    methods.delete(msg.payload).then((role) => {

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

exports.addPermission = (msg, done) => {

    methods.addPermission(msg.payload).then((role) => {

        done(null, {
            err: null,
            status: 200,
            data: "role associated to permission"
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

exports.removePermission = (msg, done) => {

    methods.removePermission(msg.payload).then((role) => {

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