const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkOperator } = require('../config/auth');
const Bus = require('../models/Bus');
const Seat = require('../models/Seat');

router.get('/create', ensureAuthenticated, canAddSeat, async(req, res) => {
    const buses = await Bus.find();
    res.render('addSeat', { user: req.user, buses });
});

router.post('/create', ensureAuthenticated, async(req, res) => {
    const { seat } = req.body;
    let newSeat = new Seat({ seat, busId });
    await newSeat.save();
    res.status(200).redirect('/dashboard/seats');
});

function canAddSeat(req, res, next) {
    if (!checkOperator(req.user)) {
        res.flash('msg', 'Login as operator');
        res.redirect('/users/login');
    }
    next();
}

module.exports = router;