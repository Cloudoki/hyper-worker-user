'use strict'

const accountModel = require('lib/models/account');

exports = module.exports = {};

exports.get = (account) => {
    return accountModel.where({
        id: account.id
    }).fetch();
};

exports.list = () => {
    return accountModel.fetchAll();
};

exports.add = (account) => {
    return accountModel.forge({
        slug: account.slug,
        role_id: account.role_id
    }).save();
};

exports.update = (account) => {
    return accountModel.forge()
        .where({
            id: account.id
        })
        .save({
            name: account.name,
            role_id: account.role_id
        }, {
            method: 'update'
        });
};

exports.delete = (account) => {
    return accountModel.forge().where({
            id: account.id
        }).destroy({
            require: true
        });
}
