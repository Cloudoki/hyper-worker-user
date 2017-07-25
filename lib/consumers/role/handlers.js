'use strict'

const log = require('log');
const methods = require('./methods');
const presenter = require('../../presenters/role');

exports = module.exports = {};

exports.get = (msg, reply) => {

    methods.get(msg.payload).then((role) => {

        if (!role) {
            reply({
                status: 404
            });
            return
        }

        reply({
            status: 200,
            payload: presenter.toJson(role)
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

    methods.list(msg.payload.meta).then((role) => {

        reply({
            status: 200,
            payload: presenter.toJson(role)
        });

    }).catch((err) => {
        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};

exports.add = (msg, reply) => {

    methods.add(msg.payload).then((role) => {

        reply({
            status: 200,
            payload: presenter.toJson(role)
        });

    }).catch((err) => {

        if (err.code && err.code === 400) {
            reply({
                status: 400,
                payload: err.msg
            });
            return
        }

        if (err.code && err.code === "ER_DUP_ENTRY") {
            reply({
                status: 409,
                payload: err
            });
            return
        }

        log.error(err);
        reply({
            status: 500,
            payload: err
        });

    });

};

exports.update = (msg, reply) => {

    methods.update(msg.payload).then((role) => {

        reply({
            status: 200,
            payload: presenter.toJson(role)
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            reply({
                status: 404,
                payload: err.msg
            });
            return
        }

        if (err.code && err.code === "ER_DUP_ENTRY") {
            reply({
                status: 409,
                payload: err
            });
            return
        }

        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};

exports.delete = (msg, reply) => {

    methods.delete(msg.payload).then((role) => {

        reply({
            status: 200,
            payload: null
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            reply({
                status: 404,
                payload: null
            });
            return
        }

        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};

exports.addPermission = (msg, reply) => {

    methods.addPermission(msg.payload).then((role) => {

        reply({
            status: 200,
            payload: {
                msg: "role associated to permission"
            }
        });

    }).catch((err) => {

        if (err.code && err.code === 400) {
            reply({
                status: 400,
                payload: err.msg
            });
            return
        }

        if (err.code && err.code === 404) {
            reply({
                status: 404,
                payload: null
            });
            return
        }

        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};

exports.removePermission = (msg, reply) => {

    methods.removePermission(msg.payload).then((role) => {

        reply({
            status: 200,
            payload: null
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            reply({
                status: 404,
                payload: null
            });
            return
        }

        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};