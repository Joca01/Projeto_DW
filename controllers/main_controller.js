const Course = require('../models/Courses')
const Subject = require('../models/Subjects')
const Student = require('../models/Students')
const { handle } = require('express/lib/application')

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

exports.registerSubject = async (req, res) => {
    try {
        const auth = req.body

        const find = await Subject.findOne({
            where: {
                name: auth.name,
            }
        })
        console.log(auth);

        if (find === null) {
            Subject.create({
                name: auth.name,
                credits: auth.credits,
                description: auth.description,
            })
            return res.status(201).send({ message: auth.name + ' created' })
        }
        else {
            return res.status(403).send({ message: 'Subject ' + auth.name + 'already created' })
        }
    }
    catch (err) {
        return res.status(400).send({ message: err.message }) // Controlo de erro se o user nao estiver registado
    }
}

// exports.test = async (req, res) => {
//     const association = await Course_Subject.findOne({
//         where: {
//             id: 1,
//         },
//         //include: [Subject]
//     })
//     console.log(association.toJSON());
// }


exports.associateStudent = async (req, res) => {
    try {
        const result = await Student.update(
            { courseId: 1 },
            { where: { id: 1 } }
        )
        return res.status(201).send({ message: 'Updated Student ' + courseId + ' where id was ' + id })
    }
    catch (err) {
        return res.status(404).send({ message: err.message })
    }
}

exports.associateSubject = async (req, res) => {
    try {
        const course = await Course.findOne({ where: { id: 1 } })
        const subject = await Subject.findOne({ where: { id: 3 } })
        await course.addSubject(subject)
        const result = await Course.findOne({
            where: { id: '1' },
            include: Subject
        });
        return res.status(201).send({ message: 'Associated ' + subject.getDataValue('name') + ' to ' + course.getDataValue('name') })
    }
    catch (err) {
        return res.status(404).send({ message: err.message });
    }
}

exports.getAllSubjects = async (req, res) => {
    try {
        const allSubjects = await Subject.findAll({ include: Course })
        return res.status(201).send({ message: allSubjects })
    }
    catch (err) {
        return res.status(404).send({ message: err.message });
    }
}


