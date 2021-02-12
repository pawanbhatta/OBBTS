const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');
const Seat = require('../models/Seat');
const Booker = require('../models/Booker');

router.get('/create', async(req, res) => {
    const buses = await Bus.find();
    const seats = await Seat.find();
    res.render('addBooker', { buses, seats });
});

router.post('/create', async(req, res) => {
    const { name, email, phone, busId, seatId } = req.body;
    const newBooker = new Booker({ name, email, phone, seatId, busId });
    await newBooker.save();
    res.redirect('/dashboard/bookers')
        // res.render('bookers', { newBooker });
});

module.exports = router;