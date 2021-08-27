'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class msg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  msg.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    gu: DataTypes.STRING,
    other: DataTypes.STRING,
    tip: DataTypes.STRING,
    startTime: DataTypes.BIGINT,
    endTime: DataTypes.BIGINT,
    del: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'msg',
  });
  return msg;
};