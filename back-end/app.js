require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {criarUser, updateUser} = require("./user.js");
const User = require("./models/User.js");
const path = require("path");
const cors = require("cors");

const URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET;

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
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "../front-end")));

app.get("/", (req, res) => { // homepage
    res.sendFile(path.join(__dirname, "../front-end/index.html"))
});

app.put("/:id", async (req, res) => { // atualizar dados
    const { id } = req.params;
    console.log("ID recebido:", id);
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

app.get("/perfil", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/perfil.html"))
})

// AUTH

app.get("/perfil_", autenticarToken , async (req, res) => {
    const user = await User.findById(req.userId, "-senha");
    res.json(user);
})

app.get("/register", async (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/register.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/login.html"))
})

app.post("/register", async (req, res) => {
    try {
        const userId = await criarUser(req.body);
        res.status(201).json({ userId });
    } catch (err) {
        console.error("Erro ao registrar:", err);
        res.status(400).json({ erro: "Erro ao registrar", detalhes: err });
    }
})

app.post("/login", async (req, res) => {
    const {email, senha} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: "Senha inválida" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

    res.json({ userId: user._id, token });
})

// task-create

app.get("/task-create", async (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/task-create.html"))
})

app.post("/task-create", async (req, res) => {
})

app.get("/:id/:task_num", async (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/task.html"))
}) // pagina da task

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ erro: "Token ausente" });

    jwt.verify(token, SECRET, (err, payload) => {
        if (err) return res.status(403).json({ erro: "Token inválido" });
        req.userId = payload.id;
        next();
    });
}