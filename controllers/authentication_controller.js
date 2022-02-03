require("dotenv").config();
const express = require('express')
const app = express();
const Student = require('../models/Students')
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const { createTokens, validateToken } = require("../public/JS/JWT")
app.use(cookieParser())

exports.register = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Empty Form' }) // Controlo de erro se o o form estive vazio
    }
    try {
        const auth = req.body
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(auth.password, salt) // Hash da password
        const check = await Student.findAll({
            where: {
                email: auth.email,
            },
        });
        if (check.length == 0) {
            Student.create({
                name: auth.name,
                email: auth.email,
                password: hashPassword
            })
            
            return res.status(201).send({ message: auth.name + ' created' })
        }
        else {
            return res.status(403).send({
                message: 'Stundent ' + auth.name + ' already registed',
            });
        }
    } catch (err) {
        return res.status(400).send({ message: err.message }) // Controlo de erro se o user nao estiver registado
    }
}

exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Empty Form' })
    }
    try {
        const auth = req.body
        const check = await Student.findAll({
            where: {
                email: auth.email,
            }
        })
        for (let user of check) {
            if (check !== null) {
                bcrypt.compare(auth.password, user.password, (err, result) => { //compara a palavra passe introduzida com o hash
                    if (result) {
                        const accessToken = createTokens(auth.email)
                        res.cookie("access-token", accessToken, {  //guarda o access token numa cookie que dura 30 dias
                            maxAge: 60 * 60 * 24 * 30 * 1000,
                            httpOnly: true,
                        })
                        res.json('Logged in with ' + auth.email)
                    } else {
                        res.status(403).json({ error: "Wrong username and password combination" }) // Controlo a senha e o user nao combinarem
                    }
                })
            }
            else {
                return res.status(403).send({
                    message: 'Utilizador não encontrado',
                });
            }
        }
    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
}