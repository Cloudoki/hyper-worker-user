'use strict'

exports = module.exports = {};

function present(account) {

	let ap = {
		id: account.id,
		slug: account.slug,
		created: account.created_at,
		updated: account.updated_at
	};

	if (account.role) {
		ap.role = {
			id: account.role.id,
			slug: account.role.slug,
			description: account.role.description,
			created: account.role.created_at,
			updated: account.role.updated_at
		}
	}

	return ap;
}

exports.toJson = function (account) {
	if (account) {
		let accountObj = account.serialize();
		if (Array.isArray(accountObj)) {
			return {
				pagination: account.pagination,
				data: accountObj.map(present)
			};
		}
		return present(accountObj);
	}
	return null;
};