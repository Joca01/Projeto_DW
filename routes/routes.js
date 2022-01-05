module.exports = app => {

    const main_controller = require("../controllers/main_controller.js")
    const authentication_controller = require("../controllers/authentication_controller.js")

    var router = require("express").Router()

    app.use('/api', router)

    // router.get('/course1')

    router.post('/register', authentication_controller.register)

    router.post('/login', authentication_controller.login)

}