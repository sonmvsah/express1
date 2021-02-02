var express = require('express')
var app = express()
const port = 3005;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

var users = [{ id: 1, name: "mai viet son" },
    { id: 2, name: "Nguyen thi hai yen" }
];
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {

    res.render('home', { title: "mai vietson", message: "a thi la ma" });

});
app.get('/users', (req, res) => {
    res.render('users/index', {
        users: users
    });
});

// app.get('/view/:userId', (req, res) => {
//     res.render('users/view', obj);

// });
app.get('/users/search', function(req, res) {
    var keyword = req.query.q.toLowerCase();
    var matchUser = users.filter(function(x) {
        return x.name.toLowerCase().indexOf(keyword) != -1
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
    users.push({ name: name });
    res.render('users/index', {
        users: users
    });
    console.log(users);
});



app.listen(port, function() {
    console.log(" server stared now... port: " + port);
})