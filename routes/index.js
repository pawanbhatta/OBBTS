const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Bus = require('../models/Bus');
const Schedule = require('../models/Schedule');
const Checkpoint = require('../models/Checkpoint');

router.get('/', (req, res) => {
    res.status(200).render('welcome')
});

router.get('/dashboard', ensureAuthenticated, async(req, res) => {
    if (req.user.roles[0] == 'Admin') {
        const users = await User.find();
        res.status(200).render('adminDashboard', { user: req.user, users })
    }
    res.status(200).render('operatorDashboard', { user: req.user })
});

router.get('/dashboard/buses', ensureAuthenticated, async(req, res) => {
    const buses = await Bus.find({ operator: req.user._id });
    res.render('buses', { user: req.user, buses });
});

router.get('/dashboard/bookers', ensureAuthenticated, async(req, res) => {
    // const bookers = await User.find({ roles: '' });
    res.render('bookers', { user: req.user });
});

router.get('/dashboard/checkpoints', ensureAuthenticated, async(req, res) => {
    const chkpoints = await Checkpoint.find();
    let checkpoints = chkpoints.map(async cp => {
        await Bus.findOne({ _id: cp.busId }).then(async result => {
            const { _doc } = cp;
            cp = { _doc, busName: result.busName };
        });
        return cp;
    });

    // exports.getAuthorUserNames = async (req, res) => {
    //     if (req.body.data) {
    //       let mappedArr = req.body.data.map(async nade => {
    //         await User.findOne({ _id: nade.authorID }).then(result => {
    //           nade.author = result.username;
    //         });
    //         return nade;
    //       });
    //       res.status(200).send(await Promise.all(mappedArr));
    //     }
    //   };
    console.log(checkpoints)
    let cps = {};
    const { checkpoint, busId } = checkpoints._doc;
    cps = {...cps, busName, checkpoint, busId };
    // console.log(cps)
    res.render('checkpoints', { user: req.user, cps });
});

router.get('/dashboard/schedules', ensureAuthenticated, async(req, res) => {
    let schedules = await Schedule.find();

    // let busPromises = schedules.map(async(sch, i) => await Bus.find(sch.busId));
    // let checkPromises = schedules.map(async(sch, i) => await Checkpoint.find(sch.checkpoints.forEach(cp => cp.checkpoint)));
    // const busNames = await Promise.all(busPromises);
    // const cps = await Promise.all(checkPromises);
    // const checkpoints = cps[0];
    // const buses = busNames[0];

    // let shs = [];
    // let newSchedules = schedules.forEach(async(sh) => {
    //     let shh = [];
    //     let bus = await Bus.find(sh.busId);
    //     // let checkpoints = await Checkpoint.find(sh.checkpoints.forEach(cp => cp.checkpoint));
    //     let checkPromises = schedules.map(async(sch, i) => await Checkpoint.find(sch.checkpoints.forEach(cp => cp.checkpoint)));
    //     const cps = await Promise.all(checkPromises);
    //     const checkpoints = cps[0];
    //     shh.push(sh);
    //     shh.push(bus);
    //     shh.push(checkpoints);
    //     shs.push(shhh);
    // });
    res.render('schedules', { user: req.user, schedules });
});

module.exports = router;