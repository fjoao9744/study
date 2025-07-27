const User = require("./models/User.js");
const bcrypt = require("bcrypt");

async function criarUser(data) {
    const {nome, email, senha, confirm_senha} = data;
    if (senha !== confirm_senha) {
        throw new Error("Credenciais incompativeis");
    }
    if (!nome || !email || !senha) {
        throw new Error("Campos obrigatórios não preenchidos");
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novo = new User({
        nome: nome,
        email: email,
        senha: senhaCriptografada,
        tasks: ""
    });

    await novo.save();
    console.log("Usuário salvo:", novo);
    return novo._id
}

async function updateUser(id, tasks) {
    const usuarioAtualizado = await User.findByIdAndUpdate(
        id,
        { tasks },
        { new: true }
    );

    if (!usuarioAtualizado) {
        console.log("Usuário não encontrado");
        return null;
    }

    console.log("Tasks atualizadas:", usuarioAtualizado);
    return usuarioAtualizado;
}

module.exports = {
    criarUser,
    updateUser
}