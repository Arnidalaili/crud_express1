'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    underscored: true,
  });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};