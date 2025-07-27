function create_task(nome) {
    let task = {nome: nome, check: false};
    return task;
}
function add_child_task(task, task_child) {
    task.filhos[task_child] = task_child;
}

// document.getElementById("create_task__form").addEventListener("submit", async (event) => {
//             event.preventDefault();
//             try {
//                 let task = event.target.task.value;
//                 try {
//                     console.log(task)
//                     await fetch(`/${localStorage.getItem("userId")}`, {
//                         method: "PUT",
//                         headers: {
//                             "Content-Type": "application/json",
//                             "Authorization": "Bearer " + localStorage.getItem("token")},
//                             body: JSON.stringify({tasks: task})
//                         })
//                     event.target.task.value = "";
//                 } catch (err) {
//                     console.error("erro:", err.message)
//                 }

//             } catch (err) {
//                 console.error("erro:", err.message)
//             }

//             // location.reload()
//         })