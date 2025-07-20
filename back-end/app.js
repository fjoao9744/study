const express = require("express");
const app = express();
const hds = requite("express-handlebars")

app.engine('handlebars', hds.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})