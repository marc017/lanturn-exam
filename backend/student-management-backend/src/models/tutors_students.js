'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutors_Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Tutor, { through: "Tutors", as: 'TutorsMap' });
      this.belongsToMany(models.Student, { through: "Students", as: 'StudentsMap' });
    }
  };
  Tutors_Students.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tutors_Students',
  });
  return Tutors_Students;
};