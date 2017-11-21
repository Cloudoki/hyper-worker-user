'use strict'

const hyperError = require('hyper-error')
const bcrypt = require('bcrypt')
const saltRounds = 10
const config = require('config')
const dbMethods = require('./db_methods')
const dbUsers = require('../user/methods')
const dbClients = require('../client/methods')
const utils = require('./utils')
const validate = require('./validate')
const grantTypes = ['authorization_code', 'client_credentials', 'refresh_token', 'password']
const expiresIn = config.get('oauth2').token_expiresIn

exports = module.exports = {}

/**
 * Validate if text and hash match.
 * @param {String} plainText - The text that was hashed
 * @param {String} hash - The hash
 * @returns {Boolean} true if valid, false otherwise.
 */
const checkHash = function (plainText, hash) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(plainText, hash, function (err, res) {
			if (err) {
				reject(new hyperError.InvalidPassword('Password validation failed.'))
				return
			}
			resolve(res)
		})
	})
}

/**
 * Validate if grant is valid
 * @param {String} grant - The grant that was requested
 * @returns {Boolean} true if valid, false otherwise.
 */
const validateGrant = function (grant) {
	return grantTypes.includes(grant)
}

/**
* Authorize a client for a user.
* @param {String} clientID - The client unique id (required)
* @param {String} userID - The user id (required)
* @returns {Object} The saved data.
*/
const approveClient = function (clientID, userID) {
	return dbMethods.approvedClients.find(clientID, userID).then((data) => {
		return new Promise((resolve, reject) => {
			if (!data) {
					return dbMethods.approvedClients.save(clientID, userID)
					.then(client => {
						if (!client) {
								reject(new hyperError.SaveFailed('Failed to save the client authorization.'))
								return
							}
							resolve(client)
					})
			}
			resolve(data)
		})
	}).catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err)
		})
	})
};

/**
* Validate if client is authorized.
* @param {String} clientID - The client unique id (required)
* @param {String} userID - The user id (required)
* @returns {Boolean} true if valid, false otherwise.
*/
exports.authorized = function (clientID, userID) {
	return dbClients.findByClientID(clientID)
	.then((client) => {
		return new Promise((resolve, reject) => {
			if (client) {
				resolve(client.attributes.trusted != null && client.attributes.trusted == 1)
			} else {
				dbMethods.approvedClients.find(clientID, userID)
				.then(client => {
					resolve(client != null)
				})
			}
		})
	})
	.catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err)
		})
	})
};

/**
* Revoke previously allowed client access
*/
exports.revokeClient = function(client, user) {
	return dbMethods.approvedClients.delete(clientID, userID)
	.then(client => {
		return new Promise((resolve, reject) => {
			if (!client) {
				reject(new hyperError.NotFound('Client authorization was not found.'))
				return
			}
			resolve(client)
		})
	})
	.catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err)
		})
	})
}

/**
 * Check if the client is trusted.
 * @param {String} clientID - The client unique id
 * @returns {Boolean} true if trusted, false otherwise
 */
exports.trustedClient = function (clientID) {
	return dbClients.findByClientID(clientID)
	.then((client) => {
		return new Promise((resolve, reject) => {
			if (client) {
				resolve(client.attributes.trusted != null && client.attributes.trusted == 1)
				return
			}
			reject(new hyperError.NotFound('No client found with inputed client id.'))
		})
	})
	.catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err)
		})
	})
}

/**
 * Hashes the text received.
 * @param {String} plainText - The text to hash
 * @returns {String} The hashed text
 */
exports.hash = function (plainText) {
	return bcrypt.hash(plainText, saltRounds).then((hash) => {
		return hash
	}).catch((err) => {
		return new Promise.reject(new hyperError.HashFailed('Failed to create the hash.'))
	})
}

/**
 * Validate the user login
 * @param {String} email - The email (email)
 * @param {String} password - The user password
 * @returns {Boolean} If the username/password is valid true, false if not
 */
exports.login = function (email, password) {
	return dbUsers.findByEmail(email)
		.then((user) => {
			return new Promise((resolve, reject) => {
				if (user) {
					return checkHash(password, user.attributes.password)
						.then((valid) => {
							if (valid) {
								// remove sensitive information
								user.attributes.password =  null
								resolve(user)
								return
							}
							reject(new hyperError.InvalidPassword('Invalid password match.'))
						})
						.catch((err) => reject(err))
				}
				reject(new hyperError.NotFound('User was not found.'))
			})
		})
		.catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err)
			})
		})
}

/**
 * Generate a token for the login
 */
exports.token = function (userID, accountID) {
	const token = utils.createToken({
		sub: userID,
		exp: config.get('oauth2').loginToken_expiresIn
	})
	const expiration = config.token.calculateExpirationDate()
	return dbMethods.loginToken.save({
			userID,
			accountID,
			token,
			expirationDate: expiration
		})
		.then((loginTokenData) => {
			return new Promise((resolve, reject) => {
				if (!loginTokenData) {
					reject(new hyperError.SaveFailed('Failed to save the login token.'))
					return
				}
				resolve(token)
			})
		})
		.catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err)
			})
		})
}

/**
 * Validate a token for the login
 */
exports.validateLoginToken = function (token, done) {
	return dbMethods.loginToken.find(token)
		.then(loginTokenData => {
			return new Promise((resolve, reject) => {
				if (loginTokenData) {
					if (loginTokenData.expiration_date > new Date()) {
						dbMethods.loginToken.delete(token)
							.then(() => {
								reject(new hyperError.ExpiredToken())
							})
							.catch((err) => {
								reject(err)
							})
					} else {
						resolve(true)
					}
				} else {
					reject(new hyperError.NotFound())
				}
			})
		})
		.catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err)
			})
		})
}

/**
 * Exchange username and password for access tokens.
 */
exports.password = function (clientID, username, password, grant) {
	if (!validateGrant(grant) || grant !== 'password') {
		return new Promise((resolve, reject) => {
			reject(new hyperError.InvalidGrant())
		})
	}
	return dbUsers.findByEmail(email)
		.then((user) => {
			return new Promise((resolve, reject) => {
				if (user) {
					return checkHash(password, user.password)
						.then((valid) => {
							if (valid) {
								approveClient(clientID, userID).then(() => {
									validate.generateTokens({
											scope,
											userID,
											clientID
										})
										.then((tokens) => {
											if (tokens === false) {
												reject(new hyperError.TokensNotGenerated())
												return
											}
											if (tokens.length === 1) {
												resolve(tokens[0], null, expiresIn)
												return
											}
											if (tokens.length === 2) {
												resolve(tokens[0], tokens[1], expiresIn)
												return
											}
											reject(new hyperError.ExchangeFailed('Error exchanging password for tokens'))
										})
										.catch((err) => {
											reject(err)
										})
								}).catch((err) => {
									return new Promise((resolve, reject) => {
										reject(err)
									})
								})
							}
							reject(new hyperError.InvalidPassword('Invalid password match.'))
						})
						.catch((err) => reject(err))
				}
				reject(new hyperError.NotFound('User was not found.'))
			})
		})
		.catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err)
			})
		})
}


/**
 * Grant implicit authorization
 */
exports.implicit = function (clientID, userID, responseType) {
	if (responseType !== 'token') {
		return new Promise((resolve, reject) => {
			reject(new hyperError.InvalidResponseType())
		})
	}
	return approveClient(clientID, userID).then(() => {
		return dbClients.findByClientID(clientID)
			.then((localClient) => {
				return new Promise((resolve, reject) => {
					if (localClient) {
						const token = utils.createToken({
							sub: userID,
							exp: expiresIn
						})
						const expiration = utils.calculateExpirationDate(expiresIn)
						const accessToken = {
							token,
							clientID,
							userID,
							expirationDate: expiration,
							scope: localClient.scope
						}
						dbMethods.accessTokens.save(accessToken)
							.then(() => resolve(token, expiresIn, localClient.redirectURI))
							.catch((err) => reject(err))
					} else {
						reject(new hyperError.NotFound('Client was not found.'))
					}
				})
			})
			.catch((err) => {
				return new Promise((resolve, reject) => {
					reject(err)
				})
			})
		}).catch((err) => {
			return new Promise((resolve, reject) => {
				reject(err)
			})
		})
}

/**
 * Exchange the client id and password/secret for an access token.
 */
exports.client_credentials = function (client, scope, grant) {
	if (!validateGrant(grant) || grant !== 'client_credentials') {
		return new Promise((resolve, reject) => {
			reject(new hyperError.InvalidGrant())
		})
	}
	return dbClients.findByClientID(client.client_id)
		.then((localClient) => {
			return new Promise((resolve, reject) => {
				if (localClient.clientSecret !== client.clientSecret) {
					reject(new hyperError.InvalidSecret('Client secret does not match'))
					return
				}
				const token = utils.createToken({
					sub: client.client_id,
					exp: expiresIn
				})
				const expiration = utils.calculateExpirationDate(expiresIn)
				const accessToken = {
					token,
					clientID: client.client_id,
					userID: null, // null since there is no user when using this grant type
					expirationDate: expiration,
					scope: scope
				}
				dbMethods.accessTokens.save(accessToken)
					.then(() => resolve(token, expiresIn))
					.catch(err => reject(err))
			})
		})
		.catch(err => {
			return new Promise((resolve, reject) => {
				reject(err)
			})
		})
}

/**
 * Grant authorization code
 */
exports.authorization_code = function (clientID, userID, scope, responseType) {
	if (responseType !== 'code') {
		return new Promise((resolve, reject) => {
			reject(new hyperError.InvalidResponseType())
		})
	}
	return new Promise((resolve, reject) => {
		return dbClients.findByClientID(clientID).then((localClient) => {
			if (localClient) {
				return approveClient(clientID, userID)
					.then(() => {
						const code = utils.createToken({
							sub: userID,
							exp: config.get('oauth2').code_expiresIn
						})
						const authorizationCode = {
							code,
							clientID,
							redirectURI: localClient.attributes.redirect_uri,
							userID,
							scope
						}
						dbMethods.authorizationCodes.save(authorizationCode)
							.then(() => resolve([code, authorizationCode.redirectURI]))
							.catch((err) => reject(err))
					})
			} else {
				reject(new hyperError.NotFound('Invalid client id'))
			}
		}).catch((err) => reject(err))
	})
}

/**
 * Exchange authorization code for access tokens.
 */
exports.authorization_code_exchange = function (clientID, clientSecret, code, redirectURI) {
	return dbClients.findByClientID(clientID)
	.then((localClient) => {
		if(localClient.attributes.redirect_uri != redirectURI) {
			return new Promise((resolve, reject) => {
				reject(new hyperError.InvalidRedirectURI())
			})
		}
		if (localClient.attributes.client_secret != clientSecret) {
			return Promise.reject(new hyperError.InvalidSecret())
		} else {
			return dbMethods.authorizationCodes.find(code)
				.then(authCode => {
					if(!authCode) {
						return Promise.reject(new hyperError.ExpiredCode('Code not found or expired.'))
					}
					const result = validate.authCode(code, authCode.attributes, clientID, redirectURI)
					if(hyperError.isHyperError(result)){
						return Promise.reject(new hyperError.ExpiredCode('Code not found or expired.'))
					}
					return result
				})
				.then(authCode => {
					const nAuthCode = {
						userID: authCode.user_id,
						clientID: authCode.client_id,
						scope: authCode.scope,
						refresh: localClient.attributes.make_token == 1,
					}
					return validate.generateTokens(nAuthCode)
				})
				.then((tokens) => {
					return dbMethods.authorizationCodes.delete(code).then(() => {
						return new Promise((resolve, reject) => {
							if (tokens.length === 1) {
								return resolve([tokens[0], null, expiresIn, localClient.attributes.redirect_uri])
							}
							if (tokens.length === 2) {
								return resolve([tokens[0], tokens[1], expiresIn, localClient.attributes.redirect_uri])
							}
							return reject(new hyperError.ExchangeFailed('Error exchanging auth code for tokens'))
						})
					})
				})
				.catch((err) => {
					return new Promise((resolve, reject) => {
						reject(err)
					})
				})
		}
	}).catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err)
		})
	})
}

/**
 * Exchange the refresh token for an access token.
 */
exports.refreshToken = function (clientID, clientSecret, refreshToken, scope, done) {
	return dbClients.findByClientID(clientID)
	.then((localClient) => {
		if (localClient.attributes.client_secret != clientSecret) {
			return Promise.reject(new hyperError.InvalidSecret())
		}
		return dbMethods.refreshTokens.find(refreshToken)
		.then(foundRefreshToken => {
			const token = {
				clientID: foundRefreshToken.attributes.client_id
			}
			return validate.refreshToken(token, refreshToken, clientID)
		})
		.then(foundRefreshToken => validate.generateToken(foundRefreshToken))
		.then(token => {
			return Promise.resolve([token, expiresIn])
		})
	})
	.catch((err) => {
		return Promise.reject(err)
	})
}

/**
 * Revoke a access token or refresh token.
 */
exports.revokeToken = function (token, done) {
	return Promise.all([
		dbMethods.accessTokens.delete(token),
		dbMethods.refreshTokens.delete(token)
	]).then((values) => {
		return new Promise((resolve, reject) => {
			if(values.length > 0) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	})
	.catch((err) => {
		return new Promise((resolve, reject) => {
			reject(err)
		});
	});
}
