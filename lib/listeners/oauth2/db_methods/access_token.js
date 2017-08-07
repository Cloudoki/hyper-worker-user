'use strict'

const accessTokenModel = require('lib/models/access_token');
const jwt = require('jsonwebtoken');

exports = module.exports = {};

exports.find = (accessToken) => {
	return accessTokenModel.where({
		access_token: jwt.decode(accessToken).jti,
	}).fetch();
};

exports.hasClientUser = (clientID, userID) => {
	return accessTokenModel.where({
		client_id: clientID,
		user_id: userID
	}).count().then((c) => {
		return new Promise((resolve, reject) => {
			if (c === 1) {
				resolve(true);
				return;
			}
			resolve(false);
		});
	}).catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err);
		});
	});
};

/**
 * Saves a access token, expiration date, user id, client id, and scope. Note: The actual full
 * access token is never saved.  Instead just the ID of the token is saved.  In case of a database
 * breach this prevents anyone from stealing the live tokens.
 * @param   {String}  accessToken.token          - The access token (required)
 * @param   {String}  accessToken.clientID       - The client ID (required)
 * @param   {String}  accessToken.userID         - The user ID (required)
 * @param   {Date}    accessToken.expirationDate - The expiration of the access token (required)
 * @param   {String}  accessToken.scope          - The scope (optional)
 * @returns {Promise} resolved with the saved token
 */
exports.save = (accessToken) => {
	return accessTokenModel.forge({
		access_token: jwt.decode(accessToken.token).jti,
		client_id: accessToken.clientID,
		user_id: accessToken.userID,
		expiration_date: accessToken.expirationDate,
		scope: accessToken.scope,
	}).save();
};

/**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  accessToken.token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
exports.delete = (accessToken) => {
	return accessTokenModel.forge().where({
		access_token: jwt.decode(accessToken.token).jti,
	}).destroy({
		require: true,
	});
};

/**
 * Removes expired access tokens.
 * @returns {Promise} resolved with an associative of tokens that were expired
 */
exports.removeExpired = () => {
	return accessTokenModel.query(qb => {
		qb.where('expiration_date', '<', new Date()).fetch();
	}).destroy({
		require: true,
	});
};
