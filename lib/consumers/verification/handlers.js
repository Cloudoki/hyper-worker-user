'use strict'

const log = require('log');
const methods = require('./methods');

exports = module.exports = {};

exports.allow = (msg, reply) => {

    let a = {
        permission: 'user_read',
        account_role_id: 'ac_role',
        user_role_id: 'us_role'
    }

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
