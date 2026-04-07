"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const semester = document.getElementById('semesters');
const id = document.getElementsByClassName('semester');
console.log(id);
function getSemester() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:8000/list-semester", {
                method: 'GET'
            });
            const data = yield response.json();
            console.log("Fetched semester list:", data);
            return data;
        }
        catch (error) {
            console.error('Error fetching semester list:', error);
        }
    });
}
function init_semesterList() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const [id, data_semester] of yield getSemester()) {
            semester.innerHTML += `<li><a href="index.html" class="semester" id=${id}>${data_semester}</a></li>`;
        }
    });
}
init_semesterList();
