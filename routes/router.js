const express = require('express');
const router = express.Router();
const session = require('express-session');

// Controller import
const LoginControllers = require('../controller/LoginController');
const DashboardController = require('../controller/DashboardController');

//Initialize session management for login user
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

// Route to render the login page
router.get("/", (req, res) => {
    res.render('Login');
});

// Route to handle login logic
router.post('/doLogin', LoginControllers.doLogin);

// Route to render the dashboard, only if authenticated
router.get('/dashboard', ensureAuthenticated, DashboardController.fetchDashboard);


// Catch-all route handler for undefined routes, renders "Not Found" page
router.get('*', (req, res) => {
    res.render('NotFound');
});

module.exports = router;
