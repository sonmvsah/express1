const express = require('express');
const router = express.Router();

var db = require('../modulejs/db');

var shortid = require('shortid');
var removevi = require('../modulejs/removevi');



router.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

router.get('/view/:id', (req, res) => {
    var id = req.params.id;
    var matched = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: matched
    });

});

router.get('/edit/:id', function(req, res) {
    var id = req.params.id;
    var userEdit = db.get('users').find({ id: id }).value();

    res.render('users/edit', {
        user: userEdit
    });
});

router.post('/update', function(req, res) {

    var user = req.body;
    db.get('users')
        .find({ id: user.id })
        .assign(user)
        .write();
    res.redirect('/users');

});
router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    db.get('users')
        .remove(user)
        .write();
    res.redirect('/users');
});

router.get('/search', function(req, res) {
    var keyword = req.query.q.toLowerCase();
    var matchUser = db.get('users').value().filter(function(x) {
        return removevi(x.name.toLowerCase()).toLowerCase().indexOf(keyword) != -1
    });
    res.render('users/index', {
        users: matchUser
    });

});

router.get('/create', function(req, res) {
    res.render('users/create');
});
router.post('/create', function(req, res) {
    var name = req.body.name;
    var id = shortid.generate();

    db.get('users')
        .push({ id: id, name: name })
        .write()
    res.redirect('/users');

});


module.exports = router;