const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Student extends Model { }

Student.init({
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
