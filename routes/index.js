const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.status(200).render('welcome')
});

router.get('/dashboard', ensureAuthenticated, async(req, res) => {
    if (req.user.roles[0] == 'Admin') {
        const users = await User.find();
        res.status(200).render('adminDashboard', { name: req.user.name, role: req.user.roles[0], users })
    }
    res.status(200).render('operatorDashboard', { name: req.user.name, role: req.user.roles[0] })
});

module.exports = router;