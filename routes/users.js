const express = require('express');
const router = express.Router();

const { ensureAuthorized, checkNotAuth } = require('../config/auth');
const userController = require('../controllers/userController');

router.get('/login', checkNotAuth, (req, res) => {
    res.render('login')
});

router.get('/register', ensureAuthorized, (req, res) => {
    res.render('register')
});

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

module.exports = router;