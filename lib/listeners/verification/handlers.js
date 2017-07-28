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
                    err: null,
                    status: 200,
                    data: {
                        allow: true
                    }
                });
                return
            }

            methods.checkPermission(msg.payload, tokenObj).then((count) => {
                done(null, {
                    err: null,
                    status: 200,
                    data: {
                        allow: count === 1 ? true : false
                    }
                });
                return
            });

        } else {
            done(null, {
                err: null,
                status: 200,
                data: {
                    allow: false
                }
            });
        }

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err,
            status: 500,
            data: err
        });
    });

};