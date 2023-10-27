const express = require('express')
const { checkAuthentication, redirectIsAuth } = require("../middleware")
const { register } = require('../controller/allController')
const router = express.Router()

function initRoutes(passport) {
    router.get('/', (req, res) => { res.render('index.ejs', { title: 'Home' }) })
    router.get('/register', redirectIsAuth, (req, res) => { res.render('register.ejs', { title: 'register' }) })
    router.get('/login', redirectIsAuth, (req, res) => { res.render('login.ejs', { title: 'login' }) })
    router.get('/profile', checkAuthentication, (req, res) => {
        const user = req.user
        res.render('profile.ejs', { title: 'profile', user })
    })

    router.get('/logout', checkAuthentication, (req, res) => {
        req.logOut({ keepSessionInfo: false }, (err) => {
            if (err) console.log(err)
            res.redirect("/login")
        })
    })

    router.post('/register', redirectIsAuth, register)

    router.post('/login', redirectIsAuth, passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }), async (req, res) => {
        res.redirect("/profile")
    })
    return router;
}

module.exports = { initRoutes }