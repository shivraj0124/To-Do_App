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
var testing=1;
function addItem(e) {
    e.preventDefault();
    var checkInput = inpt.value;

    if (checkInput !== "") {

        var innerdiv = document.createElement('div');
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

    actualList.removeChild(element);
    if (actualList.children.length === 0) {
        listContain.style.display = 'none';
    }
    displayAlert("Item removed", "danger");
    setbackToDefault();
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
}
