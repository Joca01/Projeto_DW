const Course = require('../models/Courses')

exports.registerCourse = async (req, res) => {
    try {
        const auth = req.body

        const find = await Course.findOne({
            where: {
                name: auth.name,
            }
        })

        if (find === null) {
            Course.create({
                name: auth.name,
                credits: auth.credits,
                description: auth.description,
                duration: auth.duration
            })
            return res.status(201).send({ message: 'Course created' })
        }
        else {
            return res.status(403).send({ message: 'Course already created' })
        }
    }
    catch (err) {
        return res.status(400).send({ message: err.message }) // Controlo de erro se o user nao estiver registado
    }
}

exports.getCourse = async (req, res) => {
    try {
        const auth = req.body

        const find = await Course.findOne({
            where: {
                name: auth.name
            }
        })
        if (find === null) {
            return res.status(403).send({ message: 'Course does not exist' })
        }
        else {
            return res.status(200).send({ message: 'Course Found' })
        }
    }
    catch (err) {
        return res.status(400).send({ message: err.message }) // Controlo de erro se o user nao estiver registado
    }
}
