const { name } = require('ejs');
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const path = require('path')
const sequelize = require('./database')


var Course = require("./models/Courses")
var Subject = require("./models/Subjects")
var Student = require("./models/Students");

sequelize.sync().then(() => console.log('db is ready'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public'))

require('./routes/routes.js')(app)

app.get('/', (req, res) => {
    res.render('Login')
})

app.get('/HomePage', async (req, res) => {
    try {
        const coursename = await Course.findAll({ raw: true })

        console.log(coursename); 
        res.render('HomePage')
    }
    catch (err) {
        return res.status(404).send({ message: err.message })
    }
})

app.get('/course/:id', async (req, res) => {
    try {
        const courseId = await Course.findOne({ where: { id: req.params.id } })

        res.render('Courses', { course: courseId.getDataValue('name') })

    }
    catch (err) {
        return res.status(404).send({ message: err.message })
    }
})

app.get('/course/:courseId/subject/:subjectId', async (req, res) => {
    try {
        const courseId = await Course.findOne({ where: { id: req.params.courseId } })
        const subjectId = await Subject.findOne({ where: { id: req.params.subjectId } })

        res.render('Subjects')
    }
    catch (err) {
        return res.status(404).send({ message: err.message })
    }
})


const serverPort = 8080
app.listen(serverPort, () => console.log(`Server is running on Port ${serverPort}`));