'use strict'

const BaseModel = require('./base');

const instanceProps = {
	tableName: 'login_token',
	user: function () {
		return this.belongsTo(require('./user'));
	},
	account: function () {
		return this.belongsTo(require('./account'));
	}
};

const classProps = {
	typeName: 'user',
	filters: {
		// name: function (qb, value) {
		//   return qb.whereIn('name', value)
		// }
	},
	//dependents: ['role'],
	relations: [
		// 'keywords'
	]
};

exports = module.exports = BaseModel.extend(instanceProps, classProps);