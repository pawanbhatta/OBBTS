module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to enter dashboard');
        res.redirect('/users/login');
    },

    checkNotAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/dashboard');
        }
        next();
    },

    ensureAuthorized: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.roles[0] == 'Admin') {
                return next();
            }
            req.flash('error_msg', 'You are not Authorized');
            res.redirect('/operator/dashboard');
        }
        req.flash('error_msg', 'Login as Admin to create operator');
        return res.redirect('/users/login');
    },
}