const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Test extends Model { }

Test.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Test',
    timestamps: false
})

module.exports = Test
