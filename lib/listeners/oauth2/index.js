'use strict'

const handlers = require('./handlers')

exports = module.exports = {}

exports.listeners = [{
		pin: 'role:oauthFlow,cmd:hash',
		handler: handlers.hash
	},
	{
		pin: 'role:oauthClient,cmd:authorized',
		handler: handlers.authorized
	},
	{
		pin: 'role:oauthClient,cmd:revokeClient',
		handler: handlers.revokeClient
	},
	{
		pin: 'role:oauthClient,cmd:trustedClient',
		handler: handlers.trustedClient
	},
	{
		pin: 'role:oauthFlow,cmd:revokeToken',
		handler: handlers.revokeToken
	},
	{
		pin: 'role:oauthFlow,cmd:login',
		handler: handlers.login
	},
	{
		pin: 'role:oauthFlow,cmd:validateLoginToken',
		handler: handlers.validateLoginToken
	},
	{
		pin: 'role:oauthFlow,cmd:password',
		handler: handlers.password
	},
	{
		pin: 'role:oauthFlow,cmd:implicit',
		handler: handlers.implicit
	},
	{
		pin: 'role:oauthFlow,cmd:client_credentials',
		handler: handlers.client_credentials
	},
	{
		pin: 'role:oauthFlow,cmd:authorization_code',
		handler: handlers.authorization_code
	},
	{
		pin: 'role:oauthFlow,cmd:authorization_code_exchange',
		handler: handlers.authorization_code_exchange
	},
	{
		pin: 'role:oauthFlow,cmd:refresh_token',
		handler: handlers.refreshToken
	}
]
