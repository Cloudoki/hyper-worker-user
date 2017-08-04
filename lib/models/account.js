'use strict'

const BaseModel = require('./base');

const instanceProps = {
	tableName: 'account',
	role: function () {
		return this.belongsTo(require('./role'));
	},
	token: function () {
		return this.hasMany(require('./token'));
	},
	user: function () {
		return this.belongsToMany(require('./user'));
	}
};

const classProps = {
	typeName: 'user',
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