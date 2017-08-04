'use strict'

exports = module.exports = {};

function present(permission) {
    let pp = {
        id: permission.id,
        slug: permission.slug
    };

    if (permission.role) {

        pp.roles = [];

        for (let r of permission.role) {

            let rp = {
                id: r.id,
                slug: r.slug,
                description: r.description,
                created: r.created_at,
                updated: r.updated_at
            };

            pp.roles.push(rp);
        }
    }

    return pp;

}

exports.toJson = function (permission) {
    if (permission) {
        let permissionObj = permission.serialize();
        if (Array.isArray(permissionObj)) {
            return {
                pagination: permission.pagination,
                data: permissionObj.map(present)
            };
        }
        return present(permissionObj);
    }
    return null;
};