const express = require('express')
const app = express()
const path = require('path')
const serverPort = 8080

app.listen(serverPort, () => console.log(`Server is running on Port ${serverPort}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/Html/index.html'))
})