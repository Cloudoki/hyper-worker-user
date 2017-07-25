'use strict'

exports = module.exports = {};

function present(user) {

    if (user.super_admin === 1) {
        user.super_admin = true;
    } else if (user.super_admin === 0) {
        user.super_admin = false;
    }
    
    let up = {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        superAdmin: user.super_admin,
        created: user.created_at,
        updated: user.updated_at,
    };

    if (user.role) {
        up.role = {
            id: user.role.id,
            slug: user.role.slug,
            description: user.role.description,
            created: user.role.created_at,
            updated: user.role.updated_at,
        }
    }

    if (user.account) {

        up.accounts = [];

        for (let ac of user.account) {

            let ap = {
                id: ac.id,
                slug: ac.slug,
                created: ac.created_at,
                updated: ac.updated_at
            };

            if (ac.role.id) {
                ap.role = {
                    id: ac.role.id,
                    slug: ac.role.slug,
                    created: ac.role.created_at,
                    updated: ac.role.updated_at
                };
            }

            up.accounts.push(ap);
        }
    }
    
    return up;
}

exports.toJson = function (user) {
    if (user) {
        let userObj = user.serialize();
        if (Array.isArray(userObj)) {
            return {
                pagination: user.pagination,
                data: userObj.map(present)
            };
        }
        return present(userObj);
    }
    return null;
};