require("dotenv").config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const { default: mongoose } = require('mongoose')

const { initRoutes } = require('./router/index')

const expressFlash = require('express-flash')
const session = require('express-session')

const passport = require("passport")
const { passportInit } = require("./passport.config");

const { errorHandler, notFound } = require('./error-handler')

const db_url = 'mongodb://0.0.0.0:27017/Authentication'
mongoose.connect(db_url).then(() => {
    console.log('connected is Ok');
}).catch((error) => {
    console.log(error);
})

// setup session
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}))

//set up passport
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//set up application
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(expressFlash())

// set up view engine and layout
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout', 'layout/main.ejs')

// Routers
app.use(initRoutes(passport))

app.use(errorHandler)
app.use(notFound)

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})