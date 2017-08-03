'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');

exports = module.exports = {};

exports.allow = (msg, done) => {

    methods.getUser(msg.data).then((token) => {

        if (token) {

            let tokenObj = token.serialize();

            if (tokenObj.user.super_admin) {
                done(null, {
                    data: {
                        allow: true
                    }
                });
                return
            }

            methods.checkPermission(msg.data, tokenObj).then((count) => {
                done(null, {
                    data: {
                        allow: count === 1 ? true : false
                    }
                });
                return
            });

        } else {
            done(null, {
                data: {
                    allow: false
                }
            });
        }

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};