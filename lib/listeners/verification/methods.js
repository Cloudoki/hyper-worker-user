'use strict'

const permissionModel = require('lib/models/permission');
const tokenModel = require('lib/models/token');
const uapModel = require('lib/models/uap');

exports = module.exports = {};

exports.getUser = (login) => {
	return tokenModel.where({
		token: login.token
	}).fetch({
		withRelated: ['user', 'account']
	});
};

exports.checkPermission = (login, token) => {
	return uapModel.where({
		user_id: token.user_id,
		account_id: token.account_id,
		permission: login.permission
	}).count();
};

exports.getPermissions = () => {
	return permissionModel.fetchAll({
		columns: ['slug']
	});
};

exports.getUserPermissions = (token) => {
	return uapModel.where({
		user_id: token.user_id,
		account_id: token.account_id
	}).fetchAll({
		columns: ['permission']
	});
};