'use strict'

const approvedClientModel = require('lib/models/approved_client');

exports = module.exports = {};

/**
 * Returns an approved client for an user, if it exists.
 * @param {String} clientID - The client ID (required)
 * @param {String} userID - The user ID (required)
 * @returns {Promise} The approved client for that user.
 */
exports.find = (clientID, userID) => {
	return approvedClientModel.where({
		client_id: clientID,
    user_id: userID,
	}).fetch();
};

/**
 * Saves an authorized client for an user.
 * @param   {String} clientID - The client ID (required)
 * @param   {String} userID - The user ID (required)
 * @returns {Promise} resolved with the saved data
 */
exports.save = (clientID, userID) => {
	return approvedClientModel.forge({
		client_id: clientID,
		user_id: userID,
	}).save();
};

/**
 * Deletes/Revokes an approved client if exists.
 * @param   {String} clientID - The client ID (required)
 * @param   {String} userID - The user ID (required)
 * @returns {Promise} resolved with the deleted data
 */
exports.delete = (clientID, userID) => {
	return approvedClientModel.forge().where({
    client_id: clientID,
		user_id: userID,
	}).destroy({
		require: true,
	});
};
