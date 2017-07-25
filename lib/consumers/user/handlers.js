'use strict'

const log = require('log');
const methods = require('./methods');
const presenter = require('../../presenters/user');

exports = module.exports = {};

exports.get = (msg, reply) => {

    methods.get(msg.payload).then((user) => {

        reply({
            status: 200,
            payload: presenter.toJson(user)
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

    methods.list(msg.payload.meta).then((user) => {

        reply({
            status: 200,
            payload: presenter.toJson(user)
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

    msg.payload.password = 'a';
    msg.payload.superAdmin = false;

    methods.add(msg.payload).then((user) => {

        reply({
            status: 200,
            payload: presenter.toJson(user)
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

    methods.update(msg.payload).then((user) => {
        
        reply({
            status: 200,
            payload: presenter.toJson(user)
        });

    }).catch((err) => {

        if (err.code && err.code === 404) {
            reply({
                status: 404,
                payload: err.msg
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

    methods.delete(msg.payload).then((user) => {

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

exports.addAccount = (msg, reply) => {

    methods.addAccount(msg.payload).then((user) => {

        reply({
            status: 200,
            payload: {
                msg: "user associated to account"
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

exports.removeAccount = (msg, reply) => {

    methods.removeAccount(msg.payload).then((user) => {

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