'use strict'

const BaseModel = require('./base');

const instanceProps = {
    tableName: 'role',
    user: function () {
        return this.hasMany(require('./user'));
    },
    account: function () {
        return this.hasMany(require('./account'));
    },
    permission: function () {
        return this.belongsToMany('./permission');
    }
};

const classProps = {
    typeName: 'role',
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