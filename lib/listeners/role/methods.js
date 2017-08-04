'use strict'

const bookshelf = require('lib/conn/db');
const hyperError = require('hyper-error');

const roleModel = require('lib/models/role');
const permissionModel = require('lib/models/permission');

exports = module.exports = {};

exports.get = (role) => {
	return roleModel.where({
		id: role.id
	}).fetch({
		withRelated: ['permission']
	});
};

exports.list = (meta) => {

	if (!meta.order_by) meta.order_by = 'slug';
	if (!meta.dir) meta.dir = 'asc';
	if (!meta.p_size) meta.p_size = 500;
	if (!meta.page) meta.page = 1;

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

	return roleModel.where({
		slug: role.slug
	}).count().then((c) => {

		return new Promise((resolve, reject) => {

			if (c === 1) {
				reject(new hyperError.Conflict('A role with this slug alreday exists'));
				return
			}

			resolve();

		});

	}).then(() => {

		return new Promise((resolve, reject) => {

			if (role.premissions && role.permissions.length > 0) {

				let permissionChecks = [];

				for (let permission of role.permissions) {
					permissionChecks.push(permissionModel.where({
						id: permission.id
					}).count());
				}

				return Promise.all(permissionChecks).then((counts) => {

					for (let c of counts) {
						if (c === 0) {
							reject(new hyperError.BadReference('Permission does not exists'));
							return
						}
					}

					resolve();

				}).catch((err) => {
					reject(err);
				});

			}

			resolve();

		});

	}).then(() => {

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

						for (let rp of role.permissions) {
							permissions.push(permissionModel.forge(rp));
						}

						return r.permission().attach(permissions, {
							transacting: t
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

	}).catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err);
		});
	});

};

exports.update = (role) => {

	return roleModel.where({
		id: role.id
	}).count().then((c) => {

		if (c === 0) {
			return new Promise((resolve, reject) => {
				reject(new hyperError.NotFound());
			});
		}

		return roleModel.where('id', '<>', role.id).where({
			slug: role.slug
		}).count();

	}).then((c) => {


		return new Promise((resolve, reject) => {

			if (c === 1) {
				reject(new hyperError.Conflict('A role with this slug alreday exists'));
			}

			resolve();
		});

	}).then(() => {

		let newRole = {
			slug: role.slug,
			description: role.description
		};

		return roleModel.forge({
			id: role.id
		}).save(newRole, {
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
				reject(new hyperError.NotFound());
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
					reject(new hyperError.NotFound());
				});
			}

			let found = false;

			for (let permission of r.serialize().permission) {
				if (permission.id === role.permission.id) {
					return new Promise((resolve, reject) => {
						reject(new hyperError.Conflict('This permission is already associated to this role'));
					});
				}
			}

			return permissionModel.where({
				id: role.permission.id
			}).count().then((c) => {

				if (c === 0) {
					return new Promise((resolve, reject) => {
						reject(new hyperError.BadReference('Permission does not exists'));
					});
				}

				return r.permission().attach(permissionModel.forge({
					id: role.permission.id
				}));

			}).catch((err) => {
				return new Promise((resolve, reject) => {
					reject(err);
				});
			});;

		}).catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err);
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
					reject(new hyperError.NotFound());
				});
			}

			let found = false;

			for (let permission of r.serialize().permission) {
				if (permission.id === role.permission.id) {
					found = true;
				}
			}

			if (!found) {
				return new Promise((resolve, reject) => {
					reject(new hyperError.NotFound());
				});
			}

			return r.permission().detach(permissionModel.forge({
				id: role.permission.id
			}));

		});

};