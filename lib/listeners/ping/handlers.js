'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('lib/presenters/account');

exports = module.exports = {};

exports.get = (msg, done) => {

	methods.ping().then((user) => {

		if (!user) {
			done(null, {
				err: new hyperError.Internal()
			});
			return
		}

		done(null, {
			data: 'pong'
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};