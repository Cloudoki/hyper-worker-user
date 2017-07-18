'use strict'

const log = require('log');
const methods = require('./methods');

exports = module.exports = {};

exports.get = (msg, reply) => {

    methods.get(msg.payload).then((permission) => {

        if (permission) {
            let permissionObj = permission.serialize();

            reply({
                status: 200,
                payload: permissionObj
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

    methods.list().then((permission) => {

        let permissionObj = permission.serialize();

        if (permissionObj.length === 0) {
            reply({
                status: 204,
                payload: null
            });
            return
        }

        reply({
            status: 200,
            payload: permissionObj
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

    methods.add(msg.payload).then((permission) => {

        if (permission) {
            let permissionObj = permission.serialize();

            reply({
                status: 200,
                payload: permissionObj
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
    
    methods.update(msg.payload).then((permission) => {

        if (permission) {
            let permissionObj = permission.serialize();

            reply({
                status: 200,
                payload: permissionObj
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

    methods.delete(msg.payload).then((permission) => {

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