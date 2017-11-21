'use strict'

const seneca = require('util/client.js');

const cleaner = require('lib/listeners/oauth2/cleaner.js');

cleaner.startCleaningSchedule();
