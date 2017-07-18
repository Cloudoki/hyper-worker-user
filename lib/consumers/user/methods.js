'use strict'

const userModel = require('lib/model/user');

exports = module.exports = {};

exports.get = (user) => {
    return userModel.where({
        id: user.id
    }).fetch();
};

exports.list = () => {
    return userModel.fetchAll();
};

exports.add = (user) => {
    return userModel.forge({
        email: user.email,
        password: user.password,
        first_name: user.firstName,
        last_name: user.lastName,
        super_admin: user.superAdmin,
        role_id: user.roleID
    }).save();
};

exports.update = (user) => {
    return userModel.forge()
        .where({
            id: user.id
        })
        .save({
            first_name: user.firstName,
            last_name: user.lastName,
            super_admin: user.superAdmin,
            role_id: user.roleID
        }, {
            method: 'update'
        });
};

exports.delete = (user) => {
    return userModel.forge().where({
            id: user.id
        }).destroy({
            require: true
        });
}
