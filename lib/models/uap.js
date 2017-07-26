'use strict'

const BaseModel = require('./base');

const instanceProps = {
  tableName: 'user_account_permission',
  /*user: function () {
    return this.belongsTo(require('./role'));
  },
  account: function () {
    return this.hasMany(require('./token'));
  },
  permission: function () {
    return this.belongsToMany(require('./account'));
  }*/
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