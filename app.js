const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoUri;

// DB connect
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Logger
app.use(logger('dev'));

// BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // Keeps session open for 1 day
    })
}));

// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/bus', require('./routes/bus'));
app.use('/schedule', require('./routes/schedule'));
app.use('/checkpoint', require('./routes/checkpoint'));
app.use('/seat', require('./routes/seat'));
app.use('/booker', require('./routes/booker'));
// app.use('/passenger', require('./routes/passenger'));
// app.use('/ticket', require('./routes/ticket'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));