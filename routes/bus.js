const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkOperator } = require('../config/auth');
const Bus = require('../models/Bus');


router.get('/create', ensureAuthenticated, canAddBus, (req, res) => {
    res.render('addBus', { user: req.user });
});

router.post('/create', ensureAuthenticated, async(req, res) => {
    const { busNo, busName, type, numOfSeats } = req.body;
    let newBus = new Bus({ busName, busNo, type, numOfSeats });
    newBus.operator = req.user._id;
    await newBus.save();
    res.status(200).redirect('/dashboard/buses');
});

function canAddBus(req, res, next) {
    if (!checkOperator(req.user)) {
        res.flash('msg', 'Login as operator');
        res.redirect('/users/login');
    }
    next();
}

module.exports = router;