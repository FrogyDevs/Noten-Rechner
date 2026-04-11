const marks  = document.getElementById( 'marks-name') as HTMLInputElement | null;
const mark_value = document.getElementById( 'marks-value') as HTMLInputElement | null;
const overview = document.getElementById( 'overview-marks') as HTMLUListElement;
const add_mark = document.getElementById( 'add-mark') as HTMLButtonElement;
const delete_mark = document.getElementById( 'delete-mark') as HTMLButtonElement;

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
    if (!marks) return;
    if (!mark_value) return;
    const mark_title = marks.value.trim();
    const currentFach = await getCurrentFach();
    console.log(currentFach);
    const response = await fetch(`http://localhost:8000/add-mark/${currentFach[0][0]}/${mark_title}/${mark_value.value}`, {
        method: 'POST'
    })
    const data = await response.json();
    console.log(data);
    marks.value = "";
    mark_value.value = "";
    location.reload();
}

async function listMarks() {
    const fetchData = await getMarks();
    for (const [id , exam_name, mark] of fetchData){
        overview.innerHTML += `<li>${exam_name}: ${mark}</li>`
    }
}
listMarks();

add_mark?.addEventListener("click", addMark);