'use strict'

const hyperError = require('hyper-error');

const log = require('util/logger');
const methods = require('./methods');
const presenter = require('lib/presenters/user');
const seneca = require('util/client');
const oauth2 = require('lib/listeners/oauth2/methods');
const uuid = require('uuid/v4')

exports = module.exports = {};

exports.get = (msg, done) => {

	methods.get(msg.data).then((user) => {

		if (!user) {
			done(null, {
				err: new hyperError.NotFound()
			});
			return
		}

		done(null, {
			data: presenter.toJson(user)
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.list = (msg, done, sa) => {

	methods.list(msg.data, sa).then((user) => {

		if (!user) {
			done(null, {});
			return
		}

		done(null, {
			data: presenter.toJson(user)
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.add = (msg, done) => {

	return oauth2.hash(msg.password).then((hash) => {

		msg.password = hash;

		return methods.add(msg.data);

	}).then((user) => {

		if (!user) {
			done(null, {});
			return
		}

		done(null, {
			data: presenter.toJson(user)
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.update = (msg, done) => {

	methods.update(msg.data).then((user) => {

		if (!user) {
			done(null, {});
			return
		}

		done(null, {
			data: presenter.toJson(user)
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.delete = (msg, done) => {

	methods.delete(msg.data).then((user) => {

		if (!user) {
			done(null, {});
			return
		}

		done(null, {});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.addAccount = (msg, done) => {

	methods.addAccount(msg.data).then((user) => {

		if (!user) {
			done(null, {});
			return
		}

		done(null, {
			data: user
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.removeAccount = (msg, done) => {

	methods.removeAccount(msg.data).then((user) => {

		if (!user) {
			done(null, {});
			return
		}

		done(null, {
			data: user
		});

	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});

};

exports.generateRecoveryToken = (msg, done) => {
	const token = uuid()
	methods.findByEmail(msg.data.email).then((user) => {
		return methods.saveRecoveryToken(msg.data.email, token).then((recoveryData) => {
			recoveryData.attributes.username = user.attributes.first_name;
			done(null, {
				data: recoveryData
			});
		});
	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});
};

exports.recoverPassword = (msg, done) => {
	methods.getRecoveryToken(msg.data.token).then((data) => {
		if ( new Date(data.created_at).getTime() + (12 * 60 * 60 * 1000) > new Date() ) {
			return methods.deleteRecoveryToken(msg.token).then(() => {
				return new Promise((resolve, reject) => {
					reject(new hyperError.ExpiredToken());
				});
			})
		}
		return methods.findByEmail(data.attributes.email).then((user) => {
			return oauth2.hash(msg.data.password).then((hash) => {
				return methods.updatePassword(user, hash).then(() => {
					return methods.deleteRecoveryToken(msg.data.token).then(() => {
						done(null, {
							data: true
						});
					});
				});
			});
		});
	}).catch((err) => {
		log.error(err);
		done(null, {
			err: hyperError.isHyperError(err) ? err : new hyperError.Internal()
		});
	});
};
