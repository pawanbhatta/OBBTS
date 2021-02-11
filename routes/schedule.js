const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkOperator } = require('../config/auth');
const Bus = require('../models/Bus');
const Schedule = require('../models/Schedule');
const Checkpoint = require('../models/Checkpoint');

router.get('/create', ensureAuthenticated, canAddSchedule, async(req, res) => {
    const buses = await Bus.find({ operator: req.user._id });
    const checkpoints = await Checkpoint.find();
    res.render('addSchedule', { user: req.user, buses, checkpoints });
});

router.post('/create', ensureAuthenticated, async(req, res) => {
    const { busId, depart, arrival, pickup, dropoff, checkpoints } = req.body;
    let newSchedule = new Schedule({ busId, depart, arrival, pickup, dropoff, checkpoints });
    await newSchedule.save();
    res.status(200).redirect('/dashboard/schedules');
});

function canAddSchedule(req, res, next) {
    if (!checkOperator(req.user)) {
        res.flash('msg', 'Login as operator');
        res.redirect('/users/login');
    }
    next();
}

module.exports = router;