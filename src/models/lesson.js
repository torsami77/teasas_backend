'use strict';
module.exports = (sequelize, DataTypes) => {
  const lessons = sequelize.define('lessons', {
    subjectName: DataTypes.STRING,
    startdate: DataTypes.DATE,
    durationMinutes: DataTypes.INTEGER,
    grade: DataTypes.STRING
  }, {});
  return lessons;
};