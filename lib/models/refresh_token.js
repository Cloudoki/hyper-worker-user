'use strict'

const BaseModel = require('./base');

const instanceProps = {
	tableName: 'oauth_refresh_token',
	client: function () {
		return this.belongsTo(require('./clients'))
	},
	user: function () {
		return this.belongsTo(require('./user'))
	}
};

const classProps = {
	typeName: 'oauth_refresh_token',
	filters: {
		// name: function (qb, value) {
		//   return qb.whereIn('name', value)
		// }
	},
	//dependents: ['blm-model-relation-dep'],
	relations: [
		// 'keywords'
	]
};

exports = module.exports = BaseModel.extend(instanceProps, classProps);
