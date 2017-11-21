'use strict'

const BaseModel = require('./base');

const instanceProps = {
	tableName: 'oauth_client',
	user: function () {
		return this.belongsTo(require('./user'))
	}
};

const classProps = {
	typeName: 'oauth_client',
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
