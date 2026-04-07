const semesters = document.getElementById('semesters') as HTMLUListElement | null;

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
        li.innerHTML = `<a href="index.html">${data_semester}</a>`;
        
        li.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent immediate navigation
            try {
                const response = await fetch(`http://localhost:8000/set-semester/${id}`, {
                    method: 'POST'
                });
                const data = await response.json();
                console.log("Semester set response:", data);
                window.location.href = "index.html";
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