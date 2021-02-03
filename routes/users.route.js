const express = require('express');
const router = express.Router();

var db = require('../modulejs/db');

var shortid = require('shortid');
var removevi = require('../modulejs/removevi');

var userControllers = require('../controllers/users.controller');

router.get('/', userControllers.userHome);

router.get('/view/:id', userControllers.view);

router.get('/edit/:id', userControllers.edit);

router.post('/update', userControllers.update);
router.get('/delete/:id', userControllers.delete);

router.get('/search', userControllers.search);

router.get('/create', function(req, res) {
    res.render('users/create');
});
router.post('/create', userControllers.create);


module.exports = router;