'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('lib/presenters/role');

exports = module.exports = {};

exports.get = (msg, done) => {
    
    methods.get(msg.data).then((role) => {

        if (!role) {
            done(null, {
                err: new hyperError.NotFound()
            });
            return
        }

        done(null, {
            data: presenter.toJson(role)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.list = (msg, done) => {

    methods.list(msg.data).then((role) => {

        done(null, {
            data: presenter.toJson(role)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.add = (msg, done) => {
    
    methods.add(msg.data).then((role) => {

        done(null, {
            data: presenter.toJson(role)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.update = (msg, done) => {

    methods.update(msg.data).then((role) => {

        done(null, {
            data: presenter.toJson(role)
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.delete = (msg, done) => {

    methods.delete(msg.data).then((role) => {

        done(null, {});

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.addPermission = (msg, done) => {

    methods.addPermission(msg.data).then((role) => {

        done(null, {
            data: role
        });

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.removePermission = (msg, done) => {

    methods.removePermission(msg.data).then((role) => {

        done(null, {});

    }).catch((err) => {
        log.error(err);
        done(null, {
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};