'use strict'

const log = require('util/logger');
const methods = require('./methods');

exports = module.exports = {};

exports.allow = (msg, done) => {

    methods.getUser(msg.payload).then((token) => {

        if (token) {

            let tokenObj = token.serialize();

            if (tokenObj.user.super_admin) {
                done(null, {
                    status: 200,
                    payload: {
                        allow: true
                    }
                });
                return
            }

            methods.checkPermission(msg.payload, tokenObj).then((count) => {
                done(null, {
                    status: 200,
                    payload: {
                        allow: count === 1 ? true : false
                    }
                });
                return
            });

        } else {
            done(null, {
                status: 200,
                payload: {
                    allow: false
                }
            });
        }

    }).catch((err) => {
        log.error(err);
        done(err, {
            status: 500,
            payload: err
        });
    });

};