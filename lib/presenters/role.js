'use strict'

exports = module.exports = {};

function present(role) {

	let rp = {
		id: role.id,
		slug: role.slug,
		description: role.description,
		created: role.created_at,
		updated: role.updated_at
	};

	if (role.permission) {

		rp.permissions = [];

		for (let p of role.permission) {

			let rperm = {
				id: p.id,
				slug: p.slug,
				created: p.created_at,
				updated: p.updated_at
			};

			rp.permissions.push(rperm);
		}
	}

	return rp;
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