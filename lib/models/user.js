'use strict'

const BaseModel = require('./base');

const instanceProps = {
  tableName: 'user',
  role: function () {
    return this.belongsTo(require('./role'));
  },
  token: function () {
    return this.hasMany(require('./token'));
  },
  account: function () {
    return this.belongsToMany(require('./account'));
  },
  client: function () {
    return this.hasMany(require('./client'));
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