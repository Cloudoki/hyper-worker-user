'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('lib/presenters/user');
const seneca = require('util/client');

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
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.list = (msg, done, sa) => {

    methods.list(msg.data, sa).then((user) => {

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
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};

exports.add = (msg, done) => {

    seneca.act('role:oauthFlow,cmd:hash', {
        data: msg.data.password
    }, function (err, res) {

        if (err) {
            log.error(err, 'Service error!');
            done(null, {
                err: new hyperError.Internal('Service timeout')
            });
            return
        }

        // If an error comes from service
        if (res.err) {
            log.error(err, 'Service error!');
            done(null, {
                err: HyperError.isHyperError(res.err) ? new HyperError(res.err) : new hyperError.Internal(res.err)
            });
            return
        }

        user.password = data.data;

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
                err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
            });
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
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
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
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
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
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
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
            err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
        });
    });

};