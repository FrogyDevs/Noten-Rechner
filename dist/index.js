"use strict";
const fach = document.getElementById("Fach");
const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");
const overview = document.getElementById("overview-fach");
async function addFach() {
    const fach_name = fach.value.trim();
    if (!fach_name)
        return;
    try {
        const response = await fetch(`http://localhost:8000/add-fach/${fach_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        fach.value = "";
    }
    catch (error) {
        console.error('Error adding fach:', error);
    }
    location.reload();
}
async function deleteFach() {
    const fach_name = fach.value.trim();
    if (!fach_name)
        return;
    try {
        const response = await fetch(`http://localhost:8000/delete-fach/${fach_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        fach.value = "";
    }
    catch (error) {
        console.error('Error deleting fach:', error);
    }
    location.reload();
}
fach === null || fach === void 0 ? void 0 : fach.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addFach();
    }
});
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addFach);
deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", deleteFach);
async function getFach() {
    try {
        const response = await fetch("http://localhost:8000/list-fach", {
            method: 'GET'
        });
        const data = await response.json();
        console.log("Fetched fach list:", data);
        return data;
    }
    catch (error) {
        console.error('Error fetching fach list:', error);
    }
}
async function fachList() {
    const fachList = await getFach();
    for (const fach of fachList) {
        overview.innerHTML += `<li>${fach}</li>`;
    }
}
fachList();
