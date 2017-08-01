'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('../../presenters/user');

exports = module.exports = {};

exports.get = (msg, done) => {

    methods.get(msg.data).then((user) => {

        if (!user) {
            done(null, {
                err: new hyperError.NotFound()
            });
            return
        }

        done(null, {
            data: presenter.toJson(user)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err
        });
    });

};

exports.list = (msg, done) => {

    methods.list(msg.data).then((user) => {

        if (!user) {
            done(null, {});
            return
        }

        done(null, {
            data: presenter.toJson(user)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err
        });
    });

};

exports.add = (msg, done) => {

    msg.data.password = 'a';
    msg.data.superAdmin = false;

    methods.add(msg.data).then((user) => {

        if (!user) {
            done(null, {});
            return
        }

        done(null, {
            data: presenter.toJson(user)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: err
        });
    });

};

exports.update = (msg, done) => {

    methods.update(msg.data).then((user) => {

        if (!user) {
            done(null, {});
            return
        }

        done(null, {
            data: presenter.toJson(user)
        });

    }).catch((err) => {

        log.error(err);
        done(null, {
            err: err
        });

    });

};

exports.delete = (msg, done) => {

    methods.delete(msg.data).then((user) => {

        if (!user) {
            done(null, {});
            return
        }

        done(null, {});

    }).catch((err) => {

        log.error(err);
        done(null, {
            err: err
        });
    });

};

exports.addAccount = (msg, done) => {

    methods.addAccount(msg.data).then((user) => {

        if (!user) {
            done(null, {});
            return
        }

        done(null, {
            data: user
        });

    }).catch((err) => {

        log.error(err);
        done(null, {
            err: err
        });
    });

};

exports.removeAccount = (msg, done) => {

    methods.removeAccount(msg.data).then((user) => {

        if (!user) {
            done(null, {});
            return
        }

        done(null, {
            data: user
        });

    }).catch((err) => {

        log.error(err);
        done(null, {
            err: err
        });
    });

};