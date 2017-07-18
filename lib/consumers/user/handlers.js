'use strict'

const log = require('log');
const methods = require('./methods');

exports = module.exports = {};

exports.get = (msg, reply) => {

    methods.get(msg.payload).then((user) => {

        if (user) {
            let userObj = user.serialize();

            reply({
                status: 200,
                payload: userObj
            });
            return
        }

        reply({
            status: 404,
            payload: null
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

    methods.list().then((user) => {

        let userObj = user.serialize();

        if (userObj.length === 0) {
            reply({
                status: 204,
                payload: null
            });
            return
        }

        reply({
            status: 200,
            payload: userObj
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

    methods.add(msg.payload).then((user) => {

        if (user) {
            let userObj = user.serialize();

            reply({
                status: 200,
                payload: userObj
            });
            return
        }

        reply({
            status: 404,
            payload: null
        });

    }).catch((err) => {
        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};

exports.update = (msg, reply) => {
    
    methods.update(msg.payload).then((user) => {

        if (user) {
            let userObj = user.serialize();

            reply({
                status: 200,
                payload: userObj
            });
            return
        }

        reply({
            status: 404,
            payload: null
        });

    }).catch((err) => {
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
        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};