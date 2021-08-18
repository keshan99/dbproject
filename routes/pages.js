const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const detail = require('../controllers/details');





router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('first', {
        user: req.user
    });
});


router.get('/register', (req, res) => {
    res.render('register');

});

router.get('/login', (req, res) => {
    res.render('login');

});

router.get('/profile', authController.isLoggedIn, (req, res) => {

    if (req.user) {
        res.render('profile', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});

router.get('/updatepic', authController.isLoggedIn, (req, res) => {

    if (req.user) {
        res.render('updatepic', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});


router.get('/money', detail.money, (req, res) => {

    if (req.user) {
        res.render('money', {
            moneydetailIn: req.moneydetailIn,
            moneydetailOut: req.moneydetailOut,
            moneyEnterIn: req.moneyEnterIn,
            moneyEnterOut: req.moneyEnterOut,
            user: req.user

        });
    } else {
        res.redirect('/login');
    }

});

module.exports = router;