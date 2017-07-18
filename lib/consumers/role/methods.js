'use strict'

const roleModel = require('lib/model/role');

exports = module.exports = {};

exports.get = (role) => {
    return roleModel.where({
        id: role.id
    }).fetch();
};

exports.list = () => {
    return roleModel.fetchAll();
};

exports.add = (role) => {
    return roleModel.forge({
        slug: role.slug,
        description: role.description
    }).save();
};

exports.update = (role) => {
    return roleModel.forge()
        .where({
            id: role.id
        })
        .save({
            slug: role.slug,
            description: role.description
        }, {
            method: 'update'
        });
};

exports.delete = (role) => {
    return roleModel.forge().where({
            id: role.id
        }).destroy({
            require: true
        });
}
