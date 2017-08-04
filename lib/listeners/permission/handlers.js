'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('lib/presenters/permission');

exports = module.exports = {};

exports.get = (msg, done) => {

	methods.get(msg.data).then((permission) => {

		if (!permission) {
			done(null, {});
			return
		}

		done(null, {
			data: presenter.toJson(permission)
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.list = (msg, done) => {

	methods.list(msg.data).then((permission) => {

		done(null, {
			data: presenter.toJson(permission)
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};