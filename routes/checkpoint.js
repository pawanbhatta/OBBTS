const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkOperator } = require('../config/auth');
const Bus = require('../models/Bus');
const Checkpoint = require('../models/Checkpoint');

router.get('/create', ensureAuthenticated, canAddCheckpoint, async(req, res) => {
    const buses = await Bus.find();
    res.render('addCheckpoint', { user: req.user, buses });
});

router.post('/create', ensureAuthenticated, async(req, res) => {
    const { checkpoint, busId } = req.body;
    let newCheckpoint = new Checkpoint({ checkpoint, busId });
    await newCheckpoint.save();
    res.status(200).redirect('/dashboard/checkpoints');
});

function canAddCheckpoint(req, res, next) {
    if (!checkOperator(req.user)) {
        res.flash('msg', 'Login as operator');
        res.redirect('/users/login');
    }
    next();
}

module.exports = router;