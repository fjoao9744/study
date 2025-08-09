const path = window.location.pathname;
const data = JSON.parse(localStorage.getItem("tasks"));

console.log(data)

criar_filhos([data], document.getElementById("arvore"));

function criar_filhos(data, div, obj_id = "") {
    for (let index in data) {

        let obj = data[index]
        let obj_id_atual = obj_id ? obj_id + "." + obj.nome : obj.nome;

        let d = document.createElement("div")
        d.classList.add("task")

        console.log(obj_id)

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
            let add_button = document.createElement("button");
            add_button.textContent = ":";
            add_button.classList.add("add_buttons");
            add_button.style.display = "none";
            add_button.addEventListener("click", () => {
                criar_task(obj.filhos);
            })
            d.appendChild(add_button);
        }

        d.appendChild(h1);
        d.appendChild(input);

        div.appendChild(d);
    
    }
}

function salvar() {
    localStorage.setItem("tasks", JSON.stringify(data));

    fetch(`/${localStorage.getItem("userId")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(() => console.log("salvo!"))
}

function criar_task(pai, is_pai = false) {
    let div = document.createElement("div");
    div.classList.add("modal");
    div.id = "add_task__modal";
    let input = document.createElement("input");
    div.appendChild(input);
    let button = document.createElement("button");
    button.textContent = "criar";
    button.addEventListener("click", () => {
        is_pai ? pai.push({"nome": input.value, "check": false, "filhos": []}) : pai.push({"nome": input.value, "check": false})
        salvar();
        div.style.display = "none"
    })
    div.appendChild(button);
    div.style.display = "block";
    document.body.appendChild(div)
}
