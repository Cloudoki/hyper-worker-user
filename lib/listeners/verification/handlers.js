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

                let ps = [];

                methods.getPermissions().then((permissions) => {

                    for (let permission of permissions.serialize()) {
                        ps.push(permission.slug);
                    }

                    done(null, {
                        data: ps
                    });
                    return

                });


            } else {

                methods.getUserPermissions(tokenObj).then((permissions) => {
                    
                    let ps = [];

                    for (let permission of permissions.serialize()) {
                        ps.push(permission.permission);
                    }

                    done(null, {
                        data: ps
                    });
                    return

                });

            }

        } else {
            done(null, {
                data: []
            });
        }

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};