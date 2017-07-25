'use strict'

const bookshelf = require('lib/conn/db');

const accountModel = require('lib/models/account');
const roleModel = require('lib/models/role');
const userModel = require('lib/models/user');

let addUserWithAccount = (user, newUser, loadRelated) => {

    return bookshelf.transaction((t) => {
            return userModel.forge(newUser).save(null, {
                transacting: t
            }).tap((u) => {

                let accounts = [];
                let checkAccounts = [];

                for (let ac of user.accounts) {

                    checkAccounts.push(accountModel.forge({
                        id: ac.id
                    }).fetch());

                    accounts.push(accountModel.forge(ac));
                }

                return Promise.all(checkAccounts).then((acs) => {

                    if (!acs || !acs[0] || acs.length < user.accounts.length) {
                        return new Promise((resolve, reject) => {
                            let err = {
                                msg: 'account does not exists',
                                code: 400
                            };
                            reject(err);
                        });
                    }

                    return u.account().attach(accounts, {
                        transacting: t
                    });

                });

            });
        })
        .then((u) => {
            return u.load(['role', 'account.role']);
        }).catch((err) => {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        });

};

exports = module.exports = {};

exports.get = (user) => {
    return userModel.where({
        id: user.id
    }).fetch({
        withRelated: ['role', 'account.role']
    });
};

exports.list = (meta) => {

    if (!meta.order_by) {
        meta.order_by = 'first_name';
    }

    if (!meta.dir) {
        meta.dir = 'asc';
    }

    if (!meta.p_size) {
        meta.p_size = 500;
    }

    if (!meta.page) {
        meta.page = 1;
    }

    let related = [];

    if (meta.role) {
        related.push('role');
    }

    if (meta.accounts) {
        related.push('account.role');
    }

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

    let newUser = {
        email: user.email,
        password: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        super_admin: user.superAdmin
    };

    if (user.role && user.role.id) {

        return roleModel.forge({
            id: user.role.id
        }).fetch().then((role) => {
            if (!role) {
                return new Promise((resolve, reject) => {
                    let err = {
                        msg: 'role does not exists',
                        code: 400
                    }
                    reject(err);
                });
            }

            newUser.role_id = user.role.id;

            if (user.accounts && user.accounts.length > 0) {
                return addUserWithAccount(user, newUser, ['role']);
            }

            return userModel.forge(newUser).save().then((u) => {
                return u.load(['role']);
            }).catch((err) => {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            });

        });

    }

    if (user.accounts && user.accounts.length > 0) {
        return addUserWithAccount(user, newUser, []);
    }

    return userModel.forge(newUser).save();

};

exports.update = (user) => {

    return userModel.forge({
        id: user.id
    }).fetch().then((u) => {
        if (!u) {
            return new Promise((resolve, reject) => {
                reject({
                    code: 404
                });
            });
        }

        let newUser = {
            super_admin: user.superAdmin
        };

        if (user.firstName) {
            newUser.first_name = user.firstName;
        }

        if (user.lastName) {
            newUser.last_name = user.lastName;
        }

        if (user.role && user.role.id) {
            newUser.role_id = user.role.id;
        }

        return u.save(newUser, {
            method: 'update'
        }).then((u) => {
            return u.load(['role', 'account.role']);
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
                reject({
                    code: 404
                });
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
                    reject({
                        code: 404
                    });
                });
            }

            return u.account().query({
                where: {
                    id: user.account.id
                }
            }).fetchOne().then((ac) => {
                if (ac) {
                    return new Promise((resolve, reject) => {
                        let err = {
                            msg: 'the user is already associated to this account',
                            code: 400
                        }
                        reject(err);
                    });
                }

                return accountModel.forge().where({
                    id: user.account.id
                }).fetch().then((ac) => {
                    if (!ac) {
                        return new Promise((resolve, reject) => {
                            let err = {
                                msg: 'account does not exist',
                                code: 400
                            }
                            reject(err);
                        });
                    }

                    return u.account().attach(accountModel.forge({
                        id: user.account.id
                    }));


                });

            });

        });

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
                    reject({
                        code: 404
                    });
                });
            }

            return u.account().query({
                where: {
                    id: user.account.id
                }
            }).fetchOne().then((ac) => {
                if (!ac) {
                    return new Promise((resolve, reject) => {
                        reject({
                            code: 404
                        });
                    });
                }

                return u.account().detach(accountModel.forge({
                    id: user.account.id
                }));

            });

        });

};