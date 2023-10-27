const userModel = require('../model/user.model')
const { hashSync } = require('bcrypt')

async function register(req, res, next) {
    try {
        const { fullName, userName, password } = req.body;
        const hashPassword = hashSync(password, 10);
        const user = await userModel.findOne({ userName })
        if (user) {
            const referrer = req?.header('Referrer') ?? req.headers.referer;
            req.flash("error", "این نام کاربری قبلا استفاده شده است");
            return res.redirect(referrer ?? "/register")
        }
        if (!user) {
            const text = await userModel.create({
                fullName,
                userName,
                password: hashPassword
            })
            res.redirect("/login")
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register
}
