'use strict'

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/role');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.payload).then((role) => {

        if (!role) {
            done(null, {
                status: 404
            });
            return
        }

        done(null, {
            status: 200,
            payload: presenter.toJson(role)
        });

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500
        });
    });

};

exports.list = (msg, done) => {

    methods.list(msg.payload.meta).then((role) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(role)
        });

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500
        });
    });

};

exports.add = (msg, done) => {

    methods.add(msg.payload).then((role) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(role)
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

    methods.update(msg.payload).then((role) => {

        done(null, {
            status: 200,
            payload: presenter.toJson(role)
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

    methods.delete(msg.payload).then((role) => {

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

exports.addPermission = (msg, done) => {

    methods.addPermission(msg.payload).then((role) => {

        done(null, {
            status: 200,
            payload: "role associated to permission"
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

exports.removePermission = (msg, done) => {

    methods.removePermission(msg.payload).then((role) => {

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