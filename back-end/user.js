const User = require("./models/User.js");

async function criarUser(nome) {
    const novo = new User({
        nome: nome,
        tasks: "Lavar roupa"
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