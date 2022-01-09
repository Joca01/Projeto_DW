const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')
const Student = require("./Students")

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

Course.hasOne(Student, {
    foreignKey: 'studentID'
})


module.exports = Course
