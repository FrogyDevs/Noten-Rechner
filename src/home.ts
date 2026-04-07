const semester = document.getElementById('semesters') as HTMLUListElement;

async function getSemester() {
    try {
        const response = await fetch("http://localhost:8000/list-semester", {
            method: 'GET'
        });
        const data = await response.json();
        console.log("Fetched semester list:", data);
        return data;
    } catch (error) {
        console.error('Error fetching semester list:', error);
    }
}
async function init_semesterList() {
    for (const [id, data_semester] of await getSemester()) {
        semester.innerHTML += `<li><a href="index.html" class="semester">${data_semester}</a></li>`;
    }
}

init_semesterList();