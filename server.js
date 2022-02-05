const { name } = require('ejs');
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const path = require('path')
const sequelize = require('./database')
const main_controller = require('./controllers/main_controller')


var Course = require("./models/Courses")
var Subject = require("./models/Subjects")

sequelize.sync().then(() => console.log('db is ready'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public'))

require('./routes/routes.js')(app)

app.get('/', (req, res) => {
    res.render('Login')
})

app.get('/HomePage', async (req, res) => {
    const courseId1 = await Course.findOne({ where: { id: 1 } })
    const courseId2 = await Course.findOne({ where: { id: 2 } })
    const courseId3 = await Course.findOne({ where: { id: 3 } })

    res.render('HomePage', { course1: courseId1.getDataValue('name'), course2: courseId2.getDataValue('name'), course3: courseId3.getDataValue('name') })
})

app.get('/course/:id', async (req, res) => {
    try {
        const courseId = await Course.findOne({ include: Subject, where: { id: req.params.id } })

        //console.log(courseId);

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

        res.render('Subjects', { subject: subjectId.getDataValue('name') })
    }
    catch (err) {
        return res.status(404).send({ message: err.message })
    }
})

app.get('/admin', async (req, res) => {
    res.render('admin')
})


const serverPort = 8080
app.listen(serverPort, () => console.log(`Server is running on Port ${serverPort}`));