'use strict'

const bookshelf = require('lib/conn/db');

const permissionModel = require('lib/models/permission');
const roleModel = require('lib/models/role');

exports = module.exports = {};

exports.get = (role) => {
    return roleModel.where({
        id: role.id
    }).fetch({
        withRelated: ['permission']
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

    if (meta.permissions) {
        related.push('permission');
    }

    let query = roleModel.forge().orderBy(meta.order_by, meta.dir);

    if (meta.f_field && meta.filter) {
        query.where(meta.f_field, 'LIKE', `%${meta.filter}%`);
    }

    return query.fetchPage({
        pageSize: meta.p_size,
        page: meta.page,
        withRelated: related
    });

};

exports.add = (role) => {

    let newRole = {
        slug: role.slug,
        description: role.description
    };

    if (role.permissions && role.permissions.length > 0) {

        return bookshelf.transaction((t) => {
                return roleModel.forge(newRole).save(null, {
                    transacting: t
                }).tap((r) => {

                    let permissions = [];
                    let checkPermissions = [];

                    for (let rp of role.permissions) {

                        checkPermissions.push(permissionModel.forge({
                            id: rp.id
                        }).fetch());

                        permissions.push(permissionModel.forge(rp));
                    }

                    return Promise.all(checkPermissions).then((ps) => {
                        
                        for (let cp of ps) {
                            if (!cp) {
                                return new Promise((resolve, reject) => {
                                let err = {
                                    msg: 'permission does not exists',
                                    code: 400
                                };
                                reject(err);
                            });
                            }
                        }

                        return r.permission().attach(permissions, {
                            transacting: t
                        });

                    });

                });
            })
            .then((r) => {
                return r.load(['permission']);
            }).catch((err) => {
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            });

    }

    return roleModel.forge(newRole).save();

};

exports.update = (role) => {

    return roleModel.forge({
        id: role.id
    }).fetch().then((r) => {
        if (!r) {
            return new Promise((resolve, reject) => {
                reject({
                    code: 404
                });
            });
        }

        let newRole = {};

        if (role.slug) {
            newRole.slug = role.slug;
        }

        if (role.description) {
            newRole.description = role.description;
        }

        return r.save(newRole, {
            method: 'update'
        });

    }).catch((err) => {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    });

};

exports.delete = (role) => {

    return roleModel.forge({
        id: role.id
    }).fetch({
        withRelated: ['permission']
    }).then((r) => {

        if (!r) {
            return new Promise((resolve, reject) => {
                reject({
                    code: 404
                });
            });
        }

        r.permission().detach();

        return r.destroy({
            require: true
        });

    }).catch((err) => {
        return new Promise((resolve, reject) => {
            reject(err);
        });
    });

};

exports.addPermission = (role) => {

    return roleModel.forge().where({
            id: role.id
        })
        .fetch({
            withRelated: ['permission']
        }).then((r) => {
            if (!r) {
                return new Promise((resolve, reject) => {
                    reject({
                        code: 404
                    });
                });
            }

            return r.permission().query({
                where: {
                    id: role.permission.id
                }
            }).fetchOne().then((p) => {
                if (p) {
                    return new Promise((resolve, reject) => {
                        let err = {
                            msg: 'the role is already associated to this permission',
                            code: 400
                        }
                        reject(err);
                    });
                }

                return permissionModel.forge().where({
                    id: role.permission.id
                }).fetch().then((p) => {
                    if (!p) {
                        return new Promise((resolve, reject) => {
                            let err = {
                                msg: 'permission does not exist',
                                code: 400
                            }
                            reject(err);
                        });
                    }

                    return r.permission().attach(permissionModel.forge({
                        id: role.permission.id
                    }));

                });

            });

        });

};

exports.removePermission = (role) => {

    return roleModel.forge().where({
            id: role.id
        })
        .fetch({
            withRelated: ['permission']
        }).then((r) => {
            if (!r) {
                return new Promise((resolve, reject) => {
                    reject({
                        code: 404
                    });
                });
            }

            return r.permission().query({
                where: {
                    id: role.permission.id
                }
            }).fetchOne().then((p) => {
                if (!p) {
                    return new Promise((resolve, reject) => {
                        reject({
                            code: 404
                        });
                    });
                }

                return r.permission().detach(permissionModel.forge({
                    id: role.permission.id
                }));

            });

        });

};