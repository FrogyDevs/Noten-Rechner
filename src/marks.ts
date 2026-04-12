const marks = document.getElementById('mark-name') as HTMLInputElement | null;
const mark_value = document.getElementById('mark-value') as HTMLInputElement | null;
const overview_mark = document.getElementById('overview-marks') as HTMLUListElement | null;
const add_mark = document.getElementById('add-mark') as HTMLButtonElement | null;
const delete_mark = document.getElementById('delete-mark') as HTMLButtonElement | null;

async function getMarks() {
    try {
        const response = await fetch("http://localhost:8000/get-marks", {
            method: 'GET'
        })
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching marks:', error);
    }
}
async function getCurrentFach() {
    try {
        const response = await fetch("http://localhost:8000/get-currentfach", {
            method: 'GET'
        })
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching current fach:', error);
    }
}


async function addMark() {
    if (!marks || !mark_value) return;
    const mark_title = marks.value.trim();
    const mark_value_input = mark_value.value.trim();
    if (!mark_title || !mark_value_input) {
        alert("Please enter both a name and a value for the mark.");
        return;
    }
    const currentFachData = await getCurrentFach();
    if (!currentFachData || currentFachData.length === 0) {
        console.error('No current fach found');
        return;
    }
    const fachId = currentFachData[0][0];
    const response = await fetch(`http://localhost:8000/add-marks/${fachId}/${mark_title}/${mark_value_input}`, {
        method: 'POST'
    })
    const data = await response.json();
    console.log(data);
    marks.value = "";
    mark_value.value = "";
    location.reload();
}
async function deleteMark() {
    if (!marks) return;
    const mark_title = marks.value.trim();
    if (!mark_title) {
        alert("Please enter the name of the mark to delete.");
        return;
    }
    const currentFachData = await getCurrentFach();
    if (!currentFachData || currentFachData.length === 0) {
        console.error('No current fach found');
        return;
    }
    const fachId = currentFachData[0][0];
    const response = await fetch(`http://localhost:8000/delete-mark/${fachId}/${mark_title}`, {
        method: 'POST'
    })
    const data = await response.json();
    console.log(data);
    marks.value = "";
    location.reload();
}

async function listMarks() {
    if (!overview_mark) return;
    const fetchData = await getMarks();
    if (!fetchData) return;
    for (const [id, exam_name, mark] of fetchData) {
        overview_mark.innerHTML += `<li>${exam_name}: ${mark}</li>`
    }
}
listMarks();

if (marks) {
    marks.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addMark();
        }
    });
}
if (mark_value) {
    mark_value.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addMark();
        }
    });
}
if (add_mark) add_mark.addEventListener("click", addMark);
if (delete_mark) delete_mark.addEventListener("click", deleteMark);