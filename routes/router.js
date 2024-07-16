const express = require('express');
const router = express.Router();

const session = require('express-session');

const LoginControllers = require('../controller/LoginController');
const DashboardController = require('../controller/DashboardController');


router.use(session({
    secret: 'MMoneyX',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware to check authentication
const ensureAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next();
    } else {
        res.redirect('/');
    }
};

//First run
router.get("/", (req, res) => {
    res.render('Login');
});

// Login Logic
router.post('/doLogin', LoginControllers.doLogin);

//Dashboard
router.get('/dashboard', ensureAuthenticated, DashboardController.fetchDashboard);


// Not Found handler for other routes
router.get('*', (req, res) => {
    res.render('NotFound');
});

module.exports = router;
