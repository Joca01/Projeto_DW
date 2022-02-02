const { name } = require('ejs');
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const path = require('path')
const sequelize = require('./database')

var Course = require("./models/Courses")

sequelize.sync().then(() => console.log('db is ready'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public'))

require('./routes/routes.js')(app)

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/Login.html'))
})

app.get('/HomePage', (req, res) => {
    //res.sendFile(path.join(__dirname + '/public/Html/HomePage.html'))
    res.render('HomePage')
})

app.get('/course/:id', async (req, res) => {
    try {
        const courseId = await Course.findOne({ where: { id: req.params.id } })

        res.render('Course', { course: courseId.getDataValue('name') })

    }
    catch (err) {
        return res.status(404).send({ message: err.message })
    }
})

app.get('/course1/subjects', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/Subject_C1.html'))
})

app.get('/course2/subjects', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/Subject_C1.html'))
})

app.get('/course3/subjects', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/Subject_C1.html'))
})

const serverPort = 8080
app.listen(serverPort, () => console.log(`Server is running on Port ${serverPort}`));