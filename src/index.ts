const fach = document.getElementById("Fach") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const deleteButton = document.getElementById("delete-button") as HTMLButtonElement;
const overview = document.getElementById("overview") as HTMLDivElement;
async function addFach() {
    const fach_name = fach.value.trim();
    if (!fach_name) return;

    try {
        const response = await fetch(`http://localhost:8000/add-fach/${fach_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        fach.value = "";
    } catch (error) {
        console.error('Error adding fach:', error);
    }
}
async function deleteFach() {
    const fach_name = fach.value.trim();
    if (!fach_name) return;

    try {
        const response = await fetch(`http://localhost:8000/delete-fach/${fach_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        fach.value = "";
    } catch (error) {
        console.error('Error deleting fach:', error);
    }
}

fach?.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addFach();
    }
});
addButton?.addEventListener("click", addFach);
deleteButton?.addEventListener("click", deleteFach);

async function getFach() {
    try {
        const response = await fetch("http://localhost:8000/list-fach", {
            method: 'GET'
        });
        const data = await response.json();
        console.log("Fetched fach list:", data);
        return data;
    } catch (error) {
        console.error('Error fetching fach list:', error);
    }
}
async function init_fach_list() {
    const fachData = await getFach();
    if (fachData && Array.isArray(fachData)) {
        for (const fachItem of fachData) {
            const li = document.createElement("li");
            li.textContent = Array.isArray(fachItem) ? fachItem[0] : fachItem;
            document.getElementById("fach-list")?.appendChild(li);
        }
    }
}
init_fach_list();