require("dotenv").config();
const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const { createTokens, validateToken } = require("../public/JS/JWT")
const newStudent = require('../models/Students')
const db = require('../database')
app.use(cookieParser())

exports.register = async (req, res) => {
    //const newStudent = require('../models/Student')
    //  const db = require('../database')

    if (!req.body) {
        return res.staus(400).send({ error: 'EmptyFormException' }); // If request is void, error 400
    }
    try {
        const auth = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(auth.password, salt);
        const response = await db.sync();

        const check = await newStudent.findAll({
            where: {
                email: auth.email,
            },
        });
        if (check.length == 0) {
            const createStudent = await MySQL.sequelize.query(
                'INSERT INTO students (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
                {
                    type: MySQL.sequelize.QueryTypes.INSERT,
                    replacements: [email, hashPassword, firstName, lastName],
                },
            );
            log(console.log(createStudent))
            return res.status(201).send({ message: 'StudentCreated' });
        } else {
            return res.status(403).send({
                message: 'UserAlreadyRegisted',
            });
        }
    }
    catch (err) {
        return res.status(400).send({ message: err.message }) // Controlo de erro se o user nao estiver registado
    }
}

exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Empty Form' })
    }
    try {
        const auth = req.body
        db.crud_login(auth.email)
            .then(async (data) => {
                if (data == null) {
                    res.status(401).send({ message: 'User not Found' }) // Controlo de erro se o o form estive vazio
                } else {
                    bcrypt.compare(auth.password, data.password, (err, result) => { //compara a palavra passe introduzida com o hash
                        if (result) {
                            const accessToken = createTokens(auth.email)
                            res.cookie("access-token", accessToken, {  //guarda o access token numa cookie que dura 30 dias
                                maxAge: 60 * 60 * 24 * 30 * 1000,
                                httpOnly: true,
                            })
                            res.json("Logged in")
                        } else {
                            res.status(403).json({ error: "Wrong username and password combination" }) // Controlo a senha e o user nao combinarem
                        }
                    })
                }
            })
    } catch {
        res.status(400).send({ message: data })
    }
}