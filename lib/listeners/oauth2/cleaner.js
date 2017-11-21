'use strict';

const cron = require('node-cron')
const config = require('config')
const dbMethods = require('./db_methods')
const time = config.get('oauth2').db_timeToCheckExpiredTokens
const log = require('util/logger');

exports = module.exports = {}

exports.startCleaningSchedule = () => {
	const hrs = Math.floor(time / 3600)
	const mins = Math.floor((time % 3600) / 60)
	let scheduleTime = `*/${mins} * * * *`
	if (hrs > 0) {
		scheduleTime = `0 */${hrs} * * *`
	}
	log.info(`Starting Cleaning Schedule ${scheduleTime} ${hrs > 0 ? 'hours' : 'mins'}`);
	cron.schedule(scheduleTime, function() {
		dbMethods.accessTokens.removeExpired().then(() => {}).catch((err) => {
			log.error(err);
		});
		dbMethods.authorizationCodes.removeExpired().then(() => {}).catch((err) => {
			log.error(err);
		});
		dbMethods.refreshTokens.removeExpired().then(() => {}).catch((err) => {
			log.error(err);
		});
	});
};
