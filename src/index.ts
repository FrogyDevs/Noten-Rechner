const fach = document.getElementById("Fach") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const deleteButton = document.getElementById("delete-button") as HTMLButtonElement;
const overview_fach = document.getElementById("overview-fach") as HTMLUListElement;

async function getCurrentSemester() {
    try {
        const response = await fetch("http://localhost:8000/get-Currentsemester", {
            method: 'GET'
        });
        const data = await response.json();
        console.log("Current semester:", data);
        return data;
    } catch (error) {
        console.error('Error fetching current semester:', error);
    }
}

async function addFach() {
    const fach_name = fach.value.trim();
    if (!fach_name) return;
    const currentSemesterData = await getCurrentSemester();
    console.log(currentSemesterData);
    if (!currentSemesterData || currentSemesterData.length === 0) {
        console.error('No current semester found');
        return;
    }
    const semesterID = currentSemesterData[0][0]; // Assuming [ID, Name] format
    try {
        const response = await fetch(`http://localhost:8000/add-fach/${semesterID}/${fach_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        fach.value = "";
    } catch (error) {
        console.error('Error adding fach:', error);
    }
    location.reload();
}
async function deleteFach() {
    const fach_name = fach.value.trim();
    if (!fach_name) return;
    const currentSemesterData = await getCurrentSemester();
    console.log(currentSemesterData);
    if (!currentSemesterData || currentSemesterData.length === 0) {
        console.error('No current semester found');
        return;
    }
    const semesterID = currentSemesterData[0][0];
    try {
        const response = await fetch(`http://localhost:8000/delete-fach/${semesterID}/${fach_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        fach.value = "";
    } catch (error) {
        console.error('Error deleting fach:', error);
    }
    location.reload();
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
async function fachList() {
    const fetchedData = await getFach();
    if (!fetchedData) return;
    for (const [fachName] of fetchedData) {
        overview_fach.innerHTML += `<li><a href="marks.html">${fachName}</a></li>`;
    }

}
fachList();