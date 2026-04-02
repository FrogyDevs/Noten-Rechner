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
const fach = document.getElementById("Fach");
const addButton = document.getElementById("add-button");
const deleteButton = document.getElementById("delete-button");
function addFach() {
    return __awaiter(this, void 0, void 0, function* () {
        const fach_name = fach.value.trim();
        if (!fach_name)
            return;
        yield fetch(`http://localhost:8000/add-fach/${fach_name}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
            console.log(data);
            fach.value = "";
        })
            .catch(error => console.error('Error:', error));
    });
}
function deleteFach() {
    return __awaiter(this, void 0, void 0, function* () {
        const fach_name = fach.value.trim();
        if (!fach_name)
            return;
        yield fetch(`http://localhost:8000/delete-fach/${fach_name}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
            console.log(data);
            fach.value = "";
        })
            .catch(error => console.error('Error:', error));
    });
}
fach === null || fach === void 0 ? void 0 : fach.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addFach();
    }
});
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addFach);
deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", deleteFach);
