const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Student extends Model { }

Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'student',
    timestamps: false
})

module.exports = Student
