const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Bus = require('../models/Bus');
const Schedule = require('../models/Schedule');
const Checkpoint = require('../models/Checkpoint');
const Seat = require('../models/Seat');

router.get('/', (req, res) => {
    res.render('welcome')
});

router.get('/dashboard', ensureAuthenticated, async(req, res) => {
    if (req.user.roles[0] == 'Admin') {
        const users = await User.find();
        res.render('adminDashboard', { user: req.user, users })
    }
    res.render('operatorDashboard', { user: req.user })
});

router.get('/dashboard/buses', ensureAuthenticated, async(req, res) => {
    const buses = await Bus.find({ operator: req.user._id });
    res.render('buses', { user: req.user, buses });
});

router.get('/dashboard/bookers', ensureAuthenticated, async(req, res) => {
    res.render('bookers', { user: req.user });
});

router.get('/dashboard/checkpoints', ensureAuthenticated, async(req, res) => {
    const chkpoints = await Checkpoint.find();
    let checkpoints = chkpoints.map(async cp => {
        await Bus.findOne({ _id: cp.busId }).then(async(result) => {
            // if (err) {
            //     req.flash('error_msg', 'Bus not found');
            //     next();
            // }
            const { _doc } = cp;
            const { busId, checkpoint } = _doc;
            cp = { busId, checkpoint, busName: result.busName };
        });
        return cp;
    });
    checkpoints = await Promise.all(checkpoints);
    res.render('checkpoints', { user: req.user, checkpoints });
});

router.get('/dashboard/schedules', ensureAuthenticated, async(req, res) => {
    let schedules = await Schedule.find();
    let newschedules = schedules.map(async sh => {
        await Bus.findOne({ _id: sh.busId }).then(async(result) => {
            // if (err) {
            //     req.flash('error_msg', 'Bus not found');
            //     next();
            // }
            const { _doc } = sh;
            const { busId, depart, arrival, pickup, dropoff } = _doc;
            sh = { busId, depart, arrival, pickup, dropoff, busName: result.busName };
        });
        return sh;
    });
    newschedules = await Promise.all(newschedules);
    res.render('schedules', { user: req.user, newschedules });
});

router.get('/dashboard/seats', ensureAuthenticated, async(req, res, next) => {
    let seats = await Seat.find();
    // let newseats = seats.map(async sh => {
    //     await Bus.findOne({ _id: sh.busId }).then(async(result) => {
    //         // if (err) {
    //         //     req.flash('error_msg', 'Bus not found');
    //         //     next();
    //         // }
    //         const { _doc } = sh;
    //         const { seat } = _doc;
    //         sh = { seat, busName: result.busName };
    //     });
    //     return sh;
    // });
    // newseats = await Promise.all(newseats);
    res.render('seats', { user: req.user, seats });
});

module.exports = router;