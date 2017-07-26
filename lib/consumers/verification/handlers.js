'use strict'

const log = require('log');
const methods = require('./methods');

exports = module.exports = {};

exports.allow = (msg, reply) => {

    methods.getUser(msg.payload).then((token) => {

        if (token) {

            let tokenObj = token.serialize();

            if (tokenObj.user.super_admin) {
                reply({
                    status: 200,
                    payload: {
                        allow: true
                    }
                });
                return
            }

            methods.checkPermission(msg.payload, tokenObj).then((count) => {
                reply({
                    status: 200,
                    payload: {
                        allow: count === 1 ? true : false
                    }
                });
                return
            });

        } else {
            reply({
                status: 200,
                payload: {
                    allow: false
                }
            });
        }

    }).catch((err) => {
        log.error(err);
        reply({
            status: 500,
            payload: err
        });
    });

};