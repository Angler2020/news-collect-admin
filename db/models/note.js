'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  note.init({
    content: DataTypes.STRING,
    gu: DataTypes.STRING,
    other: DataTypes.STRING,
    dealTime: DataTypes.BIGINT,
    del: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'note',
  });
  return note;
};