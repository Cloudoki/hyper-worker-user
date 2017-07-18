'use strict'

const BaseModel = require('./base');

const instanceProps = {
  tableName: 'user',
  role: function () {
    return this.belongsTo(require('./role'));
  },
  account: function () {
    return this.belongsToMany(require('./account'));
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