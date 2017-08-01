'use strict'

const bookshelf = require('lib/conn/db');
const hyperError = require('hyper-error');

const accountModel = require('lib/models/account');
const roleModel = require('lib/models/role');
const userModel = require('lib/models/user');

exports = module.exports = {};

exports.get = (user) => {
    return userModel.where({
        id: user.id
    }).fetch({
        withRelated: ['role', 'account.role']
    });
};

exports.list = (meta) => {

    if (!meta.order_by) meta.order_by = 'first_name';
    if (!meta.dir) meta.dir = 'asc';
    if (!meta.p_size) meta.p_size = 500;
    if (!meta.page) meta.page = 1;

    let related = [];

    if (meta.role) related.push('role');
    if (meta.accounts) related.push('account.role');

    let query = userModel.forge().orderBy(meta.order_by, meta.dir);

    if (meta.f_field && meta.filter) {
        query.where(meta.f_field, 'LIKE', `%${meta.filter}%`);
    }

    return query.fetchPage({
        pageSize: meta.p_size,
        page: meta.page,
        withRelated: related
    });

};

exports.add = (user) => {

    return userModel.where({
        email: user.email
    }).count().then((c) => {

        return new Promise((resolve, reject) => {

            if (c === 1) {
                reject(new hyperError.Conflict('This email is already being used by another user'));
                return
            }

            resolve();

        });

    }).then(() => {

        return new Promise((resolve, reject) => {

            if (user.role && user.role.id) {
                return roleModel.where({
                    id: user.role.id
                }).count().then((c) => {

                    if (c === 0) {
                        reject(new hyperError.BadReference('Role does not exists'));
                        return
                    }

                    resolve();
                    return
                });
            }

            resolve();

        });

    }).then(() => {

        return new Promise((resolve, reject) => {

            if (user.accounts && user.accounts.length > 0) {

                let accountChecks = [];

                for (let account of user.accounts) {
                    accountChecks.push(accountModel.where({
                        id: account.id
                    }).count());
                }

                return Promise.all(accountChecks).then((counts) => {

                    for (let c of counts) {
                        if (c === 0) {
                            reject(new hyperError.BadReference('Account does not exists'));
                            return
                        }
                    }

                    resolve();

                }).catch((err) => {
                    reject(err);
                });

            }

            resolve();

        });

    }).then(() => {

        let newUser = {
            email: user.email,
            password: user.password,
            first_name: user.firstName,
            last_name: user.lastName,
            super_admin: user.superAdmin
        };

        let load = [];

        if (user.role && user.role.id) {
            newUser.role_id = user.role.id;
            load.push('role');
        }

        if (user.accounts && user.accounts.length > 0) {

            load.push('account.role');

            return bookshelf.transaction((t) => {
                    return userModel.forge(newUser).save(null, {
                        transacting: t
                    }).tap((u) => {

                        let accounts = [];

                        for (let ac of user.accounts) {
                            accounts.push(accountModel.forge(ac));
                        }

                        return u.account().attach(accounts, {
                            transacting: t
                        });

                    });
                })
                .then((u) => {
                    return u.load(load);
                }).catch((err) => {
                    return new Promise((resolve, reject) => {
                        reject(err);
                    });
                });

        }

        return userModel.forge(newUser).save().then((u) => {
            return u.load(load);
        }).catch((err) => {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        });

    }).catch((err) => {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    });

};

exports.update = (user) => {

    return userModel.where({
        email: user.id
    }).count().then((c) => {

        return new Promise((resolve, reject) => {

            if (c === 0) {
                reject(new hyperError.NotFound());
                return
            }

            resolve();

        });

    }).then(() => {

        return new Promise((resolve, reject) => {

            if (user.role && user.role.id) {
                return roleModel.where({
                    id: user.role.id
                }).count().then((c) => {

                    if (c === 0) {
                        reject(new hyperError.BadReference('Role does not exists'));
                        return
                    }

                    resolve();
                    return
                });
            }

            resolve();

        });

    }).then(() => {

        let newUser = {
            first_name: user.firstName,
            last_name: user.lastName,
            super_admin: user.superAdmin
        };

        if (user.role && user.role.id) newUser.role_id = user.role.id;

        return userModel.forge({
            id: user.id
        }).save(newUser, {
            method: 'update'
        }).then((u) => {
            return u.load(['role', 'account.role']);
        }).catch((err) => {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        });

    }).catch((err) => {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    });

};

exports.delete = (user) => {

    return userModel.forge({
        id: user.id
    }).fetch({
        withRelated: ['account']
    }).then((u) => {

        if (!u) {
            return new Promise((resolve, reject) => {
                reject(new hyperError.NotFound());
            });
        }

        u.account().detach();

        return u.destroy({
            require: true
        });

    }).catch((err) => {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    });

};

exports.addAccount = (user) => {

    return userModel.forge().where({
            id: user.id
        })
        .fetch({
            withRelated: ['account']
        }).then((u) => {
            if (!u) {
                return new Promise((resolve, reject) => {
                    reject(new hyperError.NotFound());
                });
            }

            let found = false;

            for (let account of u.serialize().account) {
                if (account.id === user.account.id) {
                    return new Promise((resolve, reject) => {
                        reject(new hyperError.Conflict('This account is already associated to this user'));
                    });
                }
            }

            return accountModel.where({
                id: user.account.id
            }).count().then((c) => {

                if (c === 0) {
                    return new Promise((resolve, reject) => {
                        reject(new hyperError.BadReference('Account does not exists'));
                    });
                }

                return u.account().attach(accountModel.forge({
                    id: user.account.id
                }));

            }).catch((err) => {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            });;

        }).catch((err) => {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        });;

};

exports.removeAccount = (user) => {

    return userModel.forge().where({
            id: user.id
        })
        .fetch({
            withRelated: ['account']
        }).then((u) => {
            if (!u) {
                return new Promise((resolve, reject) => {
                    reject(new hyperError.NotFound());
                });
            }

            let found = false;

            for (let account of u.serialize().account) {
                if (account.id === user.account.id) {
                    found = true;
                }
            }

            if (!found) {
                return new Promise((resolve, reject) => {
                    reject(new hyperError.NotFound());
                });
            }

            return u.account().detach(accountModel.forge({
                id: user.account.id
            }));

        });

};