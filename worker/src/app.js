const express = require('express');
const app = express();

const port = process.env.PORT || 3002;
app.use(express.static(__dirname + "/public"));
app.use(express.json());

//rutas
app.use('/', require('./routes/routes'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Error: no hay pagina"
    })
})


