'use strict'

const pre = require('./preHandlers');

exports = module.exports = {};

exports.listeners = [{
		pin: 'role:user,cmd:get',
		handler: pre.uGet
	},
	{
		pin: 'role:user,cmd:list',
		handler: pre.uList
	},
	{
		pin: 'role:user,cmd:add',
		handler: pre.uAdd
	},
	{
		pin: 'role:user,cmd:update',
		handler: pre.uUpdate
	},
	{
		pin: 'role:user,cmd:delete',
		handler: pre.uDelete
	},
	{
		pin: 'role:user,cmd:account-add',
		handler: pre.uAddAccount
	},
	{
		pin: 'role:user,cmd:account-remove',
		handler: pre.uRemoveAccount
	},
	{
		pin: 'role:user,cmd:generate-recovery-token',
		handler: pre.uRecoveryToken
	},
	{
		pin: 'role:user,cmd:recover-pass',
		handler: pre.uRecoverPassword
	},
	{
		pin: 'role:superadmin,cmd:get',
		handler: pre.saGet
	},
	{
		pin: 'role:superadmin,cmd:list',
		handler: pre.saList
	},
	{
		pin: 'role:superadmin,cmd:add',
		handler: pre.saAdd
	},
	{
		pin: 'role:superadmin,cmd:update',
		handler: pre.saUpdate
	},
	{
		pin: 'role:superadmin,cmd:delete',
		handler: pre.saDelete
	},
	{
		pin: 'role:superadmin,cmd:account-add',
		handler: pre.saAddAccount
	},
	{
		pin: 'role:superadmin,cmd:account-remove',
		handler: pre.saRemoveAccount
	},
	{
		pin: 'role:superadmin,cmd:generate-recovery-token',
		handler: pre.saRecoveryToken
	},
	{
		pin: 'role:superadmin,cmd:recover-pass',
		handler: pre.saRecoverPassword
	}
];
