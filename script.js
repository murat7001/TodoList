const inputField = document.querySelector(".input-field textarea"),
 todoLists = document.querySelector(".todoList"),
 clearBtn = document.querySelector(".clear-button"),
 taskNum = document.querySelector(".task-num");

function allTasks(){
    let tasks = document.querySelectorAll(".task");
    taskNum.textContent = tasks.length == 0 ? "no": tasks.length;
    let allLists= document.querySelectorAll(".list");
    if(allLists.length>0){
        todoLists.style.marginTop="20px";
        clearBtn.style.pointerEvents = "auto";
        return;
    }
    todoLists.style.marginTop="0px";
    clearBtn.style.pointerEvents = "none";

}

inputField.addEventListener("keyup",(e)=>{
    let inputVal=inputField.value.trim();

    if(e.key=="Enter" && inputVal.length > 0){
        let liTag= `<li class="list task" onclick="handleStatus(this)">
                <input type="checkbox"/>
                <span class="pending">${inputVal}</span>
                <i class="fas fa-trash-can" onclick="deleteTask(this)"></i>
            </li>`;

        todoLists.insertAdjacentHTML("beforeend", liTag);
        inputField.value="";
        allTasks();
    }
});

function handleStatus(e){
    const checkbox = e.querySelector("input");
    checkbox.checked = checkbox.checked ? false : true;
    e.classList.toggle("task");
    allTasks();
}

function deleteTask(e){
    e.parentElement.remove();
    allTasks();
}

clearBtn.addEventListener("click",()=>{
    todoLists.innerHTML="";
    allTasks();
});