'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    childName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    countryCode: DataTypes.INTEGER,
    password: DataTypes.STRING,
    grade: DataTypes.STRING,
  }, {});

  return users;
};
