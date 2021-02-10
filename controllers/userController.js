const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

module.exports = {
    login: (req, res, next) => {
        passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/users/login', failureFlash: true })(req, res, next)
    },

    register: async(req, res) => {
        const { name, email, password, password2, address, phone } = req.body;
        let errors = [];

        // Check for filled fields
        if (!name || !email || !password || !password2) {
            errors.push({ msg: "Fill all the fields" });
        }

        // Check for password match
        if (password2 !== password) {
            errors.push({ msg: "passwords do not match" })
        }

        // check password length
        if (password.length < 6) {
            errors.push({ msg: "passwords must be atleast 6 characters long" })
        }

        if (errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2,
                address,
                phone
            });
        } else {
            // Validation success
            const emailFound = await User.findOne({ email });

            if (emailFound) {
                errors.push({ msg: 'User already exist' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    address,
                    phone
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    address,
                    phone
                });

                newUser.roles.push('Operator');

                // Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async(err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        req.flash('success_msg', 'You are now registered');
                        await newUser.save();
                        res.status(200).redirect('/users/login');
                    });
                });
            }
        }
    },

    logout: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
    }
}