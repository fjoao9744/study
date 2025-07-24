const express = require("express");
const app = express();
const hds = require("express-handlebars");
const mongoose = require("mongoose");
const {criarUser, updateUser} = require("./user.js")

const URL = 'mongodb+srv://fjoao9744:0c6NDhWGQxLw6wHR@cluster0.tidg7ou.mongodb.net/teste';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB conectado");
}).catch((err) => {
    console.error("Erro ao conectar:", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', hds.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", async (req, res) => {
    const {nome} = req.body;
    const id = await criarUser(nome)
    res.json({id});
})

app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { tasks } = req.body;

    const usuarioAtualizado = await updateUser(id, tasks);

    if (!usuarioAtualizado) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({
        mensagem: "Tasks atualizadas com sucesso!",
        usuario: usuarioAtualizado
    });
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

