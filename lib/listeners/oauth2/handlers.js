'use strict'

const hyperError = require('hyper-error')

const log = require('util/logger')
const methods = require('./methods')

exports = module.exports = {}

exports.authorized = (msg, done) => {
	methods.authorized(msg.data.client_id, msg.data.user_id)
	.then((authorized) => {
		done(null, {
			data: { authorized: authorized }
		})
	})
	.catch((err) => {
		log.error(err)
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		})
	})
}

exports.revokeClient = (msg, done) => {
	methods.revokeClient(msg.data.client_id, msg.data.user_id)
		.then((revoked) => {
			done(null, {
				data: { revoked : revoked }
			})
		})
		.catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.revokeToken = (msg, done) => {
	methods.revokeToken(msg.data.token)
		.then((revoked) => {
			done(null, {
				data: { revoked : revoked }
			})
		})
		.catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.trustedClient = (msg, done) => {
	methods.trustedClient(msg.data.client_id)
		.then((trusted) => {
			done(null, {
				data: { trusted : trusted }
			})
		})
		.catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.hash = (msg, done) => {
	methods.hash(msg.data)
		.then((hash) => {
			done(null, {
				data: hash
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.login = (msg, done) => {
	methods.login(msg.data.username, msg.data.password, msg.data.account)
		.then(([token, user]) => {
			done(null, {
				data: {
					token,
					user: user
				}
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.token = (msg, done) => {
	methods.token(msg.data.user_id, msg.data.account_id)
		.then((token) => {
			if (token) {
				done(null, {
					data: token
				})
				return
			}
			done(null, {})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.validateLoginToken = (msg, done) => {
	methods.validateLoginToken(msg.data.token)
		.then((valid) => {
			done(null, {
				data: valid
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.password = (msg, done) => {
	methods.password(msg.data.client_id, msg.data.username, msg.data.password, msg.data.grant)
		.then(([token, refreshToken, expiresIn]) => {
			done(null, {
				data: {
					access_token: token,
					refresh_token: refreshToken,
					expires_in: expiresIn
				}
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.implicit = (msg, done) => {
	methods.implicit(msg.data.client_id, msg.data.user_id, msg.data.scope, msg.data.response_type)
		.then((token, redirectURI) => {
			done(null, {
				data: {
					redirect_uri: `${redirectURI}#token=${token}`,
				}
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.client_credentials = (msg, done) => {
	// {Object} client.client_id, client.client_secret
	methods.client_credentials(msg.data.client, msg.data.scope, msg.data.grant)
		.then(([token, expiresIn]) => {
			done(null, {
				data: {
					access_token: token,
					expires_in: expiresIn
				}
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.authorization_code = (msg, done) => {
	methods.authorization_code(msg.data.client_id, msg.data.user_id, msg.data.scope, msg.data.response_type)
		.then(([code, redirectURI]) => {
			done(null, {
				data: {
					redirect_uri: redirectURI + `?code=${code}`
				}
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.authorization_code_exchange = (msg, done) => {
	methods.authorization_code_exchange(msg.data.client_id, msg.data.client_secret, msg.data.code, msg.data.redirect_uri)
		.then(([token, refreshToken, expiresIn, redirectURI]) => {
			done(null, {
				data: {
					redirect_uri: redirectURI,
					data: {
						access_token: token,
						refresh_token: refreshToken,
						expires_in: expiresIn
					}
				}
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}

exports.refreshToken = (msg, done) => {
	methods.refreshToken(msg.data.client_id, msg.data.client_secret, msg.data.refresh_token, msg.data.scope)
		.then(([token, expiresIn]) => {
			done(null, {
				data: {
					access_token: token,
					expires_in: expiresIn
				}
			})
		}).catch((err) => {
			log.error(err)
			done(null, {
				err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
			})
		})
}
