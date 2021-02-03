var express = require('express')
var app = express()
const port = 3005;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))



var low = require('lowdb');
var FileSync = require('./node_modules/lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
db = low(adapter);
db.defaults({ users: [] })
    .write();
var shortid = require('shortid');

var removevi = require('./modulejs/removevi');


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {

    res.render('home', { title: "mai vietson", message: "a thi la ma" });

});
app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/view/:id', (req, res) => {
    var id = req.params.id;
    var matched = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: matched
    });

});
app.get('/users/search', function(req, res) {
    var keyword = req.query.q.toLowerCase();
    var matchUser = db.get('users').value().filter(function(x) {
        return removevi(x.name.toLowerCase()).indexOf(keyword) != -1
    });
    res.render('users/index', {
        users: matchUser
    });

});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});
app.post('/users/create', function(req, res) {
    var name = req.body.name;
    var id = shortid.generate();

    db.get('users')
        .push({ id: id, name: name })
        .write()
    res.redirect('/users');

});



app.listen(port, function() {
    console.log(" server stared now... port: " + port);
})