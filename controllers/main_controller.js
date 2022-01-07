const Course = require('../models/Courses')

exports.registerCourse = async (req, res) => {
    try {
        const auth = req.body

        const check = await Course.findAll({
            where: {
                name: auth.name,
            }
        })

        if (check.lenght == 0) {
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