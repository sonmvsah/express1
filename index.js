var express = require('express')
var app = express()
const port = 3005;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
var userRouter = require('./routes/users.route')


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', (req, res) => {

    res.render('home', { title: "mai vietson", message: "a thi la ma" });

});

app.use('/users', userRouter);




app.listen(port, function() {
    console.log(" server stared now... port: " + port);
})