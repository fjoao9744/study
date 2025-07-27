const path = window.location.pathname;
const data = JSON.parse(localStorage.getItem("tasks"))[parseInt(path.split("/")[2])];

console.log(data)

criar_filhos([data], document.getElementById("arvore"));

function criar_filhos(data, div, obj_id = "") {
    for (let index in data) {

        let obj = data[index]
        let obj_id_atual = obj_id ? obj_id + "." + obj.nome : obj.nome;

        let d = document.createElement("div")
        d.classList.add("task")
    
        let h1 = document.createElement("h1");
        h1.textContent = obj.nome;
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = obj_id_atual;
        input.checked = obj.check;

        input.addEventListener("change", event => {
            obj.check = input.checked;
            console.log(data)
            salvar();
        })

        if (obj.filhos) {
            let filhos = document.createElement("div");
            filhos.classList.add("filhos");
            d.appendChild(filhos);
            d.style.backgroundColor = "blue";
            d.style.cursor = "pointer";
            let aberto = false;
            h1.addEventListener("click", event => {
                event.stopPropagation();
                if (!aberto) {
                    criar_filhos(obj.filhos, filhos, obj_id_atual);
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

function salvar() {
    fetch(`/${localStorage.getItem("userId")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}