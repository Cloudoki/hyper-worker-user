'use strict'

const permissionModel = require('lib/model/permission');

exports = module.exports = {};

exports.get = (permission) => {
    return permissionModel.where({
        id: permission.id
    }).fetch();
};

exports.list = () => {
    return permissionModel.fetchAll();
};

exports.add = (permission) => {
    return permissionModel.forge({
        slug: permission.slug
    }).save();
};

exports.update = (permission) => {
    return permissionModel.forge()
        .where({
            id: permission.id
        })
        .save({
            slug: permission.slug
        }, {
            method: 'update'
        });
};

exports.delete = (permission) => {
    return permissionModel.forge().where({
            id: permission.id
        }).destroy({
            require: true
        });
}
