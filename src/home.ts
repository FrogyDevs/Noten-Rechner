const semesters = document.getElementById('semesters') as HTMLUListElement | null;
const semesterInput = document.getElementById('semester-input') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const deleteBtn = document.getElementById('deleteBtn') as HTMLButtonElement;
async function getSemester(): Promise<[string, string][] | undefined> {
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

async function addSemester() {
    const semester_name = semesterInput.value.trim();
    if (!semester_name) return;
    try {
        const response = await fetch(`http://localhost:8000/add-semester/${semester_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        semesterInput.value = "";
    }
    catch (error) {
        console.error('Error adding semester:', error);
    }
    location.reload();
}

async function deleteSemester() {
    const semester_name = semesterInput.value.trim();
    if (!semester_name) return;
    try {
        const response = await fetch(`http://localhost:8000/delete-semester/${semester_name}`, {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
        semesterInput.value = "";
    }
    catch (error) {
        console.error('Error adding semester:', error);
    }
    location.reload();
}

semesterInput?.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addSemester();
    }
})
addBtn?.addEventListener("click", addSemester);
deleteBtn?.addEventListener("click", deleteSemester);

async function init_semesterList() {
    const semesterList = await getSemester();
    const liElements: HTMLLIElement[] = [];

    if (!semesters || !semesterList) {
        console.warn('Could not initialize semester list: semesters element or semester list data is missing.');
        return liElements;
    }

    for (const [id, data_semester] of semesterList) {
        const li = document.createElement('li');
        li.id = String(id);
        li.className = 'semester';
        li.innerHTML = `<a href="subjects.html">${data_semester}</a>`;
        
        li.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent immediate navigation
            try {
                const response = await fetch(`http://localhost:8000/set-semester/${id}`, {
                    method: 'POST'
                });
                const data = await response.json();
                console.log("Semester set response:", data);
                window.location.href = "subjects.html";
            } catch (error) {
                console.error('Error setting semester:', error);
            }
        });

        semesters.appendChild(li);
        liElements.push(li);
    }

    return liElements; // array of li DOM objects
}

init_semesterList().catch(err => console.error("Initialization failed:", err));