'use strict'

const log = require('log');
const methods = require('./methods');

exports = module.exports = {};

exports.get = (msg, reply) => {

    methods.get(msg.payload).then((account) => {

        if (account) {
            let accountObj = account.serialize();

            reply({
                status: 200,
                payload: accountObj
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

    methods.list().then((account) => {

        let accountObj = account.serialize();

        if (accountObj.length === 0) {
            reply({
                status: 204,
                payload: null
            });
            return
        }

        reply({
            status: 200,
            payload: accountObj
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

    methods.add(msg.payload).then((account) => {

        if (account) {
            let accountObj = account.serialize();

            reply({
                status: 200,
                payload: accountObj
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
    
    methods.update(msg.payload).then((account) => {

        if (account) {
            let accountObj = account.serialize();

            reply({
                status: 200,
                payload: accountObj
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

    methods.delete(msg.payload).then((account) => {

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