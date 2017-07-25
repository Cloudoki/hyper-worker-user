'use strict'

const BaseModel = require('./base');

const instanceProps = {
    tableName: 'permission',
    permission: function () {
        return this.belongsToMany('./role');
    }
};

const classProps = {
    typeName: 'permission',
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