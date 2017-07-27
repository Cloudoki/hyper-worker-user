'use strict'

const accountModel = require('lib/models/account');
const roleModel = require('lib/models/role');

exports = module.exports = {};

exports.get = (account) => {
    return accountModel.where({
        id: account.id
    }).fetch({
        withRelated: ['role']
    });
};

exports.list = (meta) => {

    if (!meta.order_by) {
        meta.order_by = 'slug';
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

    let query = accountModel.forge().orderBy(meta.order_by, meta.dir);

    if (meta.f_field && meta.filter) {
        query.where(meta.f_field, 'LIKE', `%${meta.filter}%`);
    }

    return query.fetchPage({
        pageSize: meta.p_size,
        page: meta.page,
        withRelated: related
    });

};

exports.add = (account) => {

    let newAccount = {
        slug: account.slug
    };

    if (account.role && account.role.id) {

        return roleModel.forge({
            id: account.role.id
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

            newAccount.role_id = account.role.id;

            return accountModel.forge(newAccount).save().then((a) => {
                return a.load(['role']);
            }).catch((err) => {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            });

        });

    }

    return accountModel.forge(newAccount).save();

};

exports.update = (account) => {

    return accountModel.forge({
        id: account.id
    }).fetch().then((a) => {
        if (!a) {
            return new Promise((resolve, reject) => {
                reject({
                    code: 404
                });
            });
        }

        let newAccount = {
            slug: account.slug
        };

        if (account.role && account.role.id) {
            newAccount.role_id = account.role.id;
        }

        return a.save(newAccount, {
            method: 'update'
        }).then((u) => {
            return u.load(['role']);
        });

    }).catch((err) => {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    });

};

exports.delete = (account) => {

    return accountModel.forge({
        id: account.id
    }).fetch().then((a) => {

        if (!a) {
            return new Promise((resolve, reject) => {
                reject({
                    code: 404
                });
            });
        }

        return a.destroy({
            require: true
        });

    }).catch((err) => {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    });

};