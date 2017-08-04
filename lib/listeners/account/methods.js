'use strict'

const hyperError = require('hyper-error');

const accountModel = require('lib/models/account');
const roleModel = require('lib/models/role');

exports = module.exports = {};

exports.get = (account) => {
	return accountModel.where({
		id: account.id
	}).fetch({
		withRelated: ['role']
	});
};

exports.list = (meta) => {

	if (!meta.order_by) meta.order_by = 'slug';
	if (!meta.dir) meta.dir = 'asc';
	if (!meta.p_size) meta.p_size = 500;
	if (!meta.page) meta.page = 1;

	let related = [];

	if (meta.role) {
		related.push('role');
	}

	let query = accountModel.forge().orderBy(meta.order_by, meta.dir);

	if (meta.f_field && meta.filter) {
		query.where(meta.f_field, 'LIKE', `%${meta.filter}%`);
	}

	return query.fetchPage({
		pageSize: meta.p_size,
		page: meta.page,
		withRelated: related
	});

};

exports.add = (account) => {

	return accountModel.where({
		slug: account.slug
	}).count().then((c) => {

		return new Promise((resolve, reject) => {

			if (c === 1) {
				reject(new hyperError.Conflict('An account with this slug alreday exists'));
				return
			}

			resolve();

		});

	}).then(() => {

		return new Promise((resolve, reject) => {

			if (account.role && account.role.id) {
				return roleModel.where({
					id: account.role.id
				}).count().then((c) => {

					if (c === 0) {
						reject(new hyperError.BadReference('Role does not exists'));
						return
					}

					resolve();
					return
				});
			}

			resolve();

		});

	}).then(() => {

		let newAccount = {
			slug: account.slug
		};

		let load = [];

		if (account.role && account.role.id) {
			newAccount.role_id = account.role.id;
			load.push('role');
		}

		return accountModel.forge(newAccount).save().then((a) => {
			return a.load(load);
		}).catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err);
			});
		});

	});

};

exports.update = (account) => {

	return accountModel.where({
		id: account.id
	}).count().then((c) => {

		if (c === 0) {
			return new Promise((resolve, reject) => {
				reject(new hyperError.NotFound());
			});
		}

		return accountModel.where('id', '<>', account.id).where({
			slug: account.slug
		}).count();

	}).then((c) => {

		return new Promise((resolve, reject) => {

			if (c === 1) {
				reject(new hyperError.Conflict('An account with this slug alreday exists'));
			}

			resolve();
		});

	}).then(() => {

		return new Promise((resolve, reject) => {

			if (account.role && account.role.id) {
				return roleModel.where({
					id: account.role.id
				}).count().then((c) => {

					if (c === 0) {
						reject(new hyperError.BadReference('Role does not exists'));
						return
					}

					resolve();
					return
				});
			}

			resolve();

		});

	}).then(() => {

		let newAccount = {
			slug: account.slug
		};

		let load = [];

		if (account.role && account.role.id) {
			newAccount.role_id = account.role.id;
			load.push('role');
		}

		return accountModel.forge({
			id: account.id
		}).save(newAccount, {
			method: 'update'
		}).then((u) => {
			return u.load(load);
		}).catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err);
			});
		});

	}).catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err);
		});
	});

};

exports.delete = (account) => {

	return accountModel.forge({
		id: account.id
	}).fetch().then((a) => {

		if (!a) {
			return new Promise((resolve, reject) => {
				reject(new hyperError.NotFound());
			});
		}

		return a.destroy({
			require: true
		});

	}).catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err);
		});
	});

};