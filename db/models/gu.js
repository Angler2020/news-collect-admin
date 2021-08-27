'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gu.init({
    name: DataTypes.STRING,
    gu: DataTypes.STRING,
    tip: DataTypes.STRING,
    other: DataTypes.STRING,
    del: DataTypes.TINYINT
  }, {
    sequelize,
    // timestamps: false,
    modelName: 'gu',
  });
  return gu;
};