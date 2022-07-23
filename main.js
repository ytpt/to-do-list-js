const taskList = [
    {
        id: 1,
        name: 'create a task',
        status: "In progress",
        priority: 'low'
    },      
    {
        id: 2,
        name: 'wash a dish',
        status: 'To Do',
        priority: 'high'
    },  
    {
        id: 3,
        name: 'draw a pic',
        status: "In progress",
        priority: 'low'
    },  
    {
        id: 4,
        name: 'make a bed',
        status: 'Done',
        priority: 'high'
    },  
    {
        id: 5,
        name: 'write a post',
        status: 'To Do',
        priority: 'low'
    },
];

let radioBtn = document.querySelectorAll('input[type=radio]');
radioBtn.forEach(function(radioElem){
    radioElem.parentElement.addEventListener('click', handleTaskClick);
})

function handleTaskClick(){
    let clicked = this.getAttribute('data-clicked');
    if (clicked === null){
        this.setAttribute('data-clicked', '1');
        this.style.backgroundColor = '#CCC';
        this.querySelector('.radio').checked = true;
    } else {
        this.removeAttribute('data-clicked');
        this.style.backgroundColor = '#FFF';
        this.querySelector('.radio').checked = false;
    }
}

function changeStatus(someTask, newStatus){
    for(let i = 0; i < list.length; i++) {
        if(list[i].name === someTask) {
            list[i].status = newStatus;
        }
    }
} 
function addTask(newTask, priority){
    this.newTask = newTask;
    this.priority = priority;

    if (newTask === ''){
        console.log()
        return;
    }

    // ищем div (у которого класс list) у которого нужный нам приоритет 
    let listElem = document.getElementById(priority); // <div class="list">
    if (listElem === null){
        return;
    }

    // создаем элемент новой задачи
    let taskElem = document.createElement('div');
    taskElem.classList.add('list__input', 'task');
    taskElem.innerHTML = `
        <input class="radio" type="radio">
        <label for="">${newTask} </label>
        <button class="list__btn cross">
            <img src="img/close-icon.png" alt="cross">
        </button>`; 

    taskElem.querySelector('.cross').onclick = function(){
        deleteTaskFromHTML(this);
    }

    taskElem.addEventListener('click', handleTaskClick);

    listElem.append(taskElem);
}

function deleteTask(checkedTask){
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].name === checkedTask) {
            taskList.splice(i, 1);
        }
    }
}

let crossElements = document.getElementsByClassName('cross');
for (let i = 0; i < crossElements.length; i++){
    crossElements[i].onclick = function(){
        deleteTaskFromHTML(this);
    }
}

function deleteTaskFromHTML(element){
    element.parentElement.remove();
}


function showBy(by){
    let sortedList = {};
    let field;

    if (by === 'priority'){
        field = 'priority';

        sortedList = {
            high: [],
            low: []
        };
    } else { // by status
        field = 'status';
        
        sortedList = {
            'To Do': [],
            'In progress': [],
            'Done': []
        };
    }

    let column; // это hight или low или To Do или In progress или Done
    let taskName; // название задачи, например поцеловать севу
    for (let i = 0; i < taskList.length; i++){ // пробегаемся по всем задачам
        column = taskList[i][field];
        taskName = taskList[i].name;

        sortedList[column].push(taskName); // добавляем в массив
    }

    console.log(sortedList);
}

// enter
const inputs = document.querySelectorAll('input.new');
inputs.forEach(elem => {
    elem.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
            const priority = event.target.getAttribute('id') === 'input_high' ? 'high' : 'low'; 
            addTask(event.target.value, priority);
            event.target.value = '';
        }
    });
});

// добавляем задачу в low
document.getElementById('btn_low').onclick = function(){
    let inputElem = document.getElementById('input_low');
    addTask(inputElem.value, 'low');
    // очищаем инпут
    inputElem.value = '';
}
// добавляем задачу в high
document.getElementById('btn_high').onclick = function(){
    let inputElem = document.getElementById('input_high');
    addTask(inputElem.value, 'high');
    // очищаем инпут
    inputElem.value = '';
}