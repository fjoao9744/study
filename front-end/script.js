const data = [{
    nome: "fazer_pao",
    check: false,
    filhos: [
        {
            nome: "comprar_itens",
            check: false,
            filhos: [
                {nome: "farinha", check: true},
                {nome: "trigo", check: true},
                {nome: "leite", check: true,
                    filhos: [
                        {nome: "comparar_marcas", check: false,
                            filhos: [
                                {nome: "parmalat", check: true},
                                {nome: "Itambé", check: false}
                            ]
                        }
                    ]
                },
                {nome: "fermento", check: true},

            ]
        },
        {nome: "ligar_forno", check: true}
    ]
}]

let arvore = document.getElementById("arvore");

criar_filhos(data, arvore);

function criar_filhos(data, div, obj_id = "") {
    for (let index in data) {

        let obj = data[index]
        let obj_id_atual = obj_id + "." + obj.nome;

        let d = document.createElement("div")
        d.classList.add("task")
    
        let h1 = document.createElement("h1");
        h1.textContent = obj.nome;
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = obj_id_atual
        input.checked = obj.check;

        input.addEventListener("change", event => {
            obj.check = input.checked;
        })

        if (obj.filhos) {
            let filhos = document.createElement("div");
            filhos.classList.add("filhos");
            d.appendChild(filhos);
            d.style.backgroundColor = "blue";
            d.style.cursor = "pointer";
            let aberto = false;
            h1.addEventListener("click", event => {
                event.stopPropagation()
                if (!aberto) {
                    criar_filhos(obj.filhos, filhos, obj_id_atual)
                    aberto = true;
                } else {
                    while (filhos.firstChild) {
                        filhos.removeChild(filhos.firstChild);
                    }
                    aberto = false;
                }
            })
        }

        d.appendChild(h1);
        d.appendChild(input);

        div.appendChild(d);
    
    }
}