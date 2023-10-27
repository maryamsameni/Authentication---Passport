// کاربر لاگین انجام داده است یا خیر
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.redirect('/login');
}
// ندارد در غیراینصورت وارد شوند signup , login کاربرانی که لاگین کرده اند، اجازه دسترسی به صفحات 
function redirectIsAuth(req, res, next) {
    if (req.isAuthenticated()) return res.redirect("/profile");
    return next();
}

module.exports = { redirectIsAuth, checkAuthentication }