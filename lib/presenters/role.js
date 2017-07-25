'use strict'

exports = module.exports = {};

function present(role) {
    return {
        id: role.id,
        slug: role.slug,
        description: role.description,
        created: user.created_at,
        updated: user.updated_at
    };
}

exports.toJson = function (role) {
    if (role) {
        let roleObj = role.serialize();
        if (Array.isArray(roleObj)) {

            return {
                pagination: role.pagination,
                data: roleObj.map(present)
            };
        }
        return present(roleObj);
    }
    return null;
};