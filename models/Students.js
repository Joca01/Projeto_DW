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

// Registo de um utilizador na base de dados
exports.crud_register = (name, email, password) => {
    User.create({
        name: name,
        email: email,
        password: password
    })
}

exports.crud_login = (email) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({ email: email }, (err, dados) => {
            if (err) {
                reject(null)
            }
            else {
                resolve(dados)
            }
        })
    })
}