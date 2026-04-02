const fach = document.getElementById("Fach") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const deleteButton = document.getElementById("delete-button") as HTMLButtonElement;

async function addFach() {
    const fach_name = fach.value.trim();
    if (!fach_name) return;

    await fetch(`http://localhost:8000/add-fach/${fach_name}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fach.value = "";
        })
        .catch(error => console.error('Error:', error));
}
async function deleteFach() {
    const fach_name = fach.value.trim();
    if (!fach_name) return;
    await fetch(`http://localhost:8000/delete-fach/${fach_name}`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fach.value = "";
        })
        .catch(error => console.error('Error:', error));
}

fach?.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addFach();
    }
});
addButton?.addEventListener("click", addFach);
deleteButton?.addEventListener("click", deleteFach);

