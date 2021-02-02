var express = require('express')
var app = express()
const port = 3005;


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {

    res.render('home', { title: "mai vietson", message: "a thi la ma" });

});





app.listen(port, function() {
    console.log(" server stared now... port: " + port);
})