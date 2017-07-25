'use strict'

exports = module.exports = {};

function present(permission) {
    return {
        id: permission.id,
        slug: permission.slug,
        created: permission.created_at,
        updated: permission.updated_at
    };
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