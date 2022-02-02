const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Subject extends Model { }

Subject.init({
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
}, {
    sequelize,
    modelName: 'subject',
    timestamps: false
})

module.exports = Subject
