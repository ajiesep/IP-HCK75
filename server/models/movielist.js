"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovieList.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  MovieList.init(
    {
      userId: DataTypes.INTEGER,
      listName: DataTypes.STRING,
      tags: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MovieList",
    }
  );
  return MovieList;
};
