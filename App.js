var inpt = document.querySelector('.todoinput');
var add = document.querySelector('.add');
var listContain = document.querySelector('.list');
var actualList = document.querySelector('.actualList');
const alert = document.querySelector(".alert");
var clearAll = document.querySelector('.clearAllTasks');

// addItem event
add.addEventListener('click', addItem);
// clear all taska
clearAll.addEventListener('click',clearAllTasks);

window.addEventListener("DOMContentLoaded", setupItems);

var testing=1;
function addItem(e) {
    e.preventDefault();
    var checkInput = inpt.value;
    const id = new Date().getTime().toString();
    var value = checkInput;
    if (checkInput !== "") {

        var innerdiv = document.createElement('div');
        let attr = document.createAttribute("data-id");
        attr.value = id;
        innerdiv.setAttributeNode(attr);
        innerdiv.classList.add("list-task");
        innerdiv.innerHTML = `
        <input class="task " value="${inpt.value}"></input>
        <div class="myBtns">
        <button class="complete btn">complete</button>
        <button class="delete btn">delete</button></div>`;
                
        actualList.appendChild(innerdiv);

        var tasks = innerdiv.querySelector('.task');
        
        // Complete btn event and function
        const completeBtn = innerdiv.querySelector('.complete');
        completeBtn.addEventListener('click', (e)=>{
            tasks.classList.add('completedLine');
            displayAlert("Task completed!", "success");
        });

        // Delete btn event
        const deleteBtn = innerdiv.querySelector('.delete');
        deleteBtn.addEventListener('click', deleteFun);
        
        addToLocalStorage(id, value);
        // alert top box
        displayAlert("Task added Successfully!", "success");
        listContain.style.display = 'block';
        setbackToDefault();
    }
    else{
        displayAlert("please enter value!", "danger");
        setbackToDefault();
    }
};

function setbackToDefault(){
    inpt.value = "";
}


//   alert function
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// Delete function
function deleteFun(e){
    var element = e.currentTarget.parentElement.parentElement;
    var id = element.dataset.id;
    actualList.removeChild(element);
    if (actualList.children.length === 0) {
        listContain.style.display = 'none';
    }
    displayAlert("Item removed", "danger");
    setbackToDefault();
    removeFromLocalStorage(id)
}

// Clear all Tasks 
function clearAllTasks(){
    const items = document.querySelectorAll(".list-task");
    if (items.length > 0) {
        items.forEach(function (item) {
            actualList.removeChild(item);
        });
}   
    listContain.style.display = 'none';
    localStorage.removeItem("list");
}


function addToLocalStorage(id, value)
{
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });

    localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}


function setupItems() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        });
        listContain.style.display = 'block';
    }
}

function createListItem(id, value) {
    var innerdiv = document.createElement('div');
    let attr = document.createAttribute("data-id");
    attr.value = id;
    innerdiv.setAttributeNode(attr);
    innerdiv.classList.add("list-task");
    innerdiv.innerHTML = `
        <input class="task " value="${value}"></input>
        <div class="myBtns">
        <button class="complete btn">complete</button>
        <button class="delete btn">delete</button></div>`;

    actualList.appendChild(innerdiv);

    var tasks = innerdiv.querySelector('.task');

    // Complete btn event and function
    const completeBtn = innerdiv.querySelector('.complete');
    completeBtn.addEventListener('click', (e) => {
        tasks.classList.add('completedLine');
        displayAlert("Task completed!", "success");
    });

    // Delete btn event
    const deleteBtn = innerdiv.querySelector('.delete');
    deleteBtn.addEventListener('click', deleteFun);
}

