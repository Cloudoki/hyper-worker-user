'use strict'

const permissionModel = require('lib/models/permission');

exports = module.exports = {};

exports.get = (permission) => {
    return permissionModel.where({
        id: permission.id
    }).fetch();
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

    let query = permissionModel.forge().orderBy(meta.order_by, meta.dir);

    if (meta.f_field && meta.filter) {
        query.where(meta.f_field, 'LIKE', `%${meta.filter}%`);
    }

    return query.fetchPage({
        pageSize: meta.p_size,
        page: meta.page
    });

};