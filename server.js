const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public'))

require('./routes/routes.js')(app)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/index.html'))
})

const serverPort = 8080
app.listen(serverPort, () => console.log(`Server is running on Port ${serverPort}`));
