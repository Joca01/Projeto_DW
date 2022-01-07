const express = require('express')
const app = express()
const path = require('path')
const sequelize = require('./database')

sequelize.sync().then(() => console.log('db is ready'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public'))

require('./routes/routes.js')(app)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/index.html'))
})

app.get('/HomePage', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/HomePage.html'))
})

app.get('/course1', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/Course1.html'))
})

app.get('/course2', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/Course2.html'))
})

// app.get('/course1/subjects', (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/Html/Subjects.html'))
// })


const serverPort = 8080
app.listen(serverPort, () => console.log(`Server is running on Port ${serverPort}`));