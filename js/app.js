let taskToDo = document.getElementById('taskToDo');
addTaskBtn = document.getElementById('addTaskBtn');
tasksDiv = document.getElementById('taskBody');

checkboxBtn = document.querySelectorAll('.checkbox');
tasksArray = [];
tasksArrayActive = [];


//fill tasksArray with data
if (window.localStorage.getItem('task')) {
    tasksArray = JSON.parse(localStorage.getItem('task'));
}
getStoreData()

tasksDiv.addEventListener('click', (e) => {
    //target delete button
    if (e.target.classList.contains('del')) {
        deleteFromStore(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove()
    }
    //target edit button
    if (e.target.classList.contains('edit')) {
        edit(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove()
    }
    //target checkbox button
    if (e.target.classList.contains('checkbox')) {
        e.target.parentElement.classList.toggle('done')

        checkTask(e.target.parentElement.getAttribute('data-id'))

    }
})
//create data function
function addNewTask(taskToDo) {
    // console.log(tasksArray)
    //create tasks
    if (taskToDo.value !== '') {
        const task = {
            id: tasksArray.length + 1,
            taskText: taskToDo.value,
            completed: false
        }

        
        tasksArray.push(task)
        taskToDo.value = ''
        taskAdding(tasksArray, 'tasks')
        storeData(tasksArray)

    } else (alert('pleas enter Task'))

}
//create place for data function
function taskAdding(tasksArray, typeTask) {
    //this for clean div every time
    tasksDiv.innerHTML = ''
    //create elems 
    tasksArray.forEach((task) => {
        let createDiv = document.createElement('div');
        checkText = document.createElement('input');
        inputText = document.createElement('p');
        EditText = document.createElement('h3');
        DeleteText = document.createElement('h3');
        //set attribute for  elems
        inputText.innerHTML = task.taskText
        EditText.innerHTML = 'E'
        DeleteText.innerHTML = 'X'

        createDiv.className = typeTask;
        checkText.setAttribute('type', 'checkbox')
        checkText.setAttribute('class', 'checkbox')


        createDiv.appendChild(checkText)
        createDiv.appendChild(inputText)
        createDiv.appendChild(EditText)
        createDiv.appendChild(DeleteText)

        createDiv.setAttribute('data-id', task.id)
        createDiv.setAttribute('draggable', 'true')
        EditText.setAttribute('class', 'edit')
        DeleteText.setAttribute('class', 'del')


        tasksDiv.appendChild(createDiv)
        
        if (task.completed == true) {
            createDiv.classList.toggle('done');
            checkboxBtn.checked
            // console.log(task)
        } 

    });

     //functions for drag and drop tasks  
     document.querySelectorAll('.tasks').forEach((task) => {
        task.addEventListener('dragstart', () => {
            task.classList.add('tasksDrag')
            startDragId = +task.dataset.id - 1
            return startDragId
        })
        task.addEventListener('dragover', (e) => {
            e.preventDefault()
            task.classList.add('tasksOver')
        })
        task.addEventListener('dragleave', () => {
            task.classList.remove('tasksOver')
        })
        task.addEventListener('dragend', () => {
            task.classList.remove('tasksDrag')
            task.classList.remove('tasksOver')
    
        })
        task.addEventListener('drop', () => {
            endDragId = +task.dataset.id - 1
            swapItems(startDragId, endDragId)
            task.classList.remove('tasksDrag')
            task.classList.remove('tasksOver')
        })
        function swapItems(from, to) {
            start = tasksArray[from]
            end = tasksArray[to]
            tasksArray.splice(from, 1, end)
            tasksArray.splice(to, 1, start)
            storeData(tasksArray)
            getStoreData()

        }
    
    })
}   
//store the data in local storage
function storeData(tasksArray) {
    //turn data to json
    window.localStorage.setItem('task', JSON.stringify(tasksArray));
}
//get the data from local storage
function getStoreData() {

    data = window.localStorage.getItem('task')
    if (data) {
        //turn data to string
        let task = JSON.parse(data)
        taskAdding(task, 'tasks')
    }
}

//delete task function
function deleteFromStore(e) {
    tasksArray = tasksArray.filter((taskId) => taskId.id != e)
    storeData(tasksArray)
}

function checkTask(e) {
    for (i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id == e) {
            tasksArray[i].completed == false ? (tasksArray[i].completed = true) : (tasksArray[i].completed = false)
        }
    }
    storeData(tasksArray)
}
//edit Task function
function edit(e) {
    for (i = 0; i < tasksArray.length; i++) {
        if (tasksArray[i].id == e) {
            taskToDo.value = tasksArray[i].taskText
            deleteFromStore(tasksArray[i].id)
        }
    }
}
//clear Tasks function
function clearTasks() {
    tasksDiv.innerHTML = ''
    window.localStorage.clear('task')

}



//function for get active tasks 


//function for get all tasks 
document.querySelector('.getAllTasks').addEventListener('click', () => {

    if (tasksArray.length > 0) {
        taskAdding(tasksArray, 'tasks')
        tasksDiv.classList.remove('taskEmpty')
    } else {
        tasksDiv.innerHTML = 'no tasks'
        tasksDiv.classList.add('taskEmpty')
    }
})

//function for get complete tasks 

tasksArray.map((task)=>{
    if (task.completed == true) {
        tasksArrayActive.push(task);
        // console.log(tasksArrayActive)
    } 
})
document.querySelector('.completedTasks').addEventListener('click', () => {
    
    if (tasksArrayActive.length > 0) {    
        
        taskAdding(tasksArrayActive, 'completeTasks')
        tasksDiv.classList.remove('taskEmpty')
    } else {
        tasksDiv.innerHTML = 'no task completed'
        tasksDiv.classList.add('taskEmpty')
    }
})
//function for get number of tasks  










if (tasksArray.length > 0) {
    taskAdding(tasksArray, 'tasks')
    tasksDiv.classList.remove('taskEmpty')
} else {
    tasksDiv.innerHTML = 'no tasks'
    tasksDiv.classList.add('taskEmpty')
}


addTaskBtn.addEventListener('click', () => {
    addNewTask(taskToDo)
    //function for get all tasks 

    if (tasksArray.length > 0) {
        taskAdding(tasksArray, 'tasks')
        tasksDiv.classList.remove('taskEmpty')
    } else {
        tasksDiv.innerHTML = 'no tasks'
        tasksDiv.classList.add('taskEmpty')
    }
})


