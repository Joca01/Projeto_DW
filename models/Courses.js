const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')
const Student = require("./Students")
const Subject = require("./Subjects")

class Course extends Model { }

Course.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'course',
    timestamps: false
})

Course.hasOne(Student);
Student.belongsTo(Course);

Course.belongsToMany(Subject, { foreignKey: "courseId", through: "Course_Subject" })
Subject.belongsToMany(Course, { foreignKey: "subjectId", through: "Course_Subject" })

module.exports = Course
