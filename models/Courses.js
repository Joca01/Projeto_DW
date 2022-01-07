const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Course extends Model { }

Course.init({
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
    duration:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'course',
    timestamps: false
})

module.exports = Course
