var db = require('../modulejs/db');
var shortid = require('shortid');
var removevi = require('../modulejs/removevi');


module.exports.create = function(req, res) {
    var name = req.body.name;
    var id = shortid.generate();

    db.get('users')
        .push({ id: id, name: name })
        .write()
    res.redirect('/users');

};

module.exports.search = function(req, res) {
    var keyword = req.query.q.toLowerCase();
    var matchUser = db.get('users').value().filter(function(x) {
        return removevi(x.name.toLowerCase()).toLowerCase().indexOf(keyword) != -1
    });
    res.render('users/index', {
        users: matchUser
    });

};
module.exports.delete = function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    db.get('users')
        .remove(user)
        .write();
    res.redirect('/users');
};
module.exports.update = function(req, res) {

    var user = req.body;
    db.get('users')
        .find({ id: user.id })
        .assign(user)
        .write();
    res.redirect('/users');

};
module.exports.edit = function(req, res) {
    var id = req.params.id;
    var userEdit = db.get('users').find({ id: id }).value();

    res.render('users/edit', {
        user: userEdit
    });
};
module.exports.view = (req, res) => {
    var id = req.params.id;
    var matched = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: matched
    });

};
module.exports.userHome = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
};