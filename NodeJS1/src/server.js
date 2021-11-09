var express = require('express');
var app = express();
var path = require('path');

//RUTAS GLOBALES//
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

//Set views
app.set('views', './views');
app.set('view engine', 'ejs');

//URL DE PAGINAS//
app.get('/', (req, res) => {
    res.status(201).render('index');
});

//ACERCA DE 201//
app.get('/app', (req, res) => {
    res.status(201).render('about');
});

//LOGIN//
app.get('/login', (req, res) => {
    res.status(201).render('login');
});

//ERROR 404//
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
});

//LEVANTAMOS EL SERVER//
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('El server se ha iniciado en: ', host, port);
});
