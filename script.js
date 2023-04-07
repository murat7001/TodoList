const container = document.querySelector(".container"),
 inputField = document.querySelector(".input-field input"),
 searchField = document.querySelector(".search-field"),
 filter = document.querySelector(".search-field input"),
 todoLists = document.querySelector(".todoList"),
 clearBtn = document.querySelector(".clear-button"),
 taskNum = document.querySelector(".task-num");

function allTasks(){
    let tasks = document.querySelectorAll(".task");
    if(tasks.length == 0){
        taskNum.textContent="no";
        searchField.style.display="none";
    }else{
        taskNum.textContent=tasks.length;
        searchField.style.display="block";
    }
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

    if(e.key=="Enter" && inputVal.length == 0){
        showAlert("warning","Please fill in the field.");
    }

    if(e.key=="Enter" && inputVal.length > 0){
        let liTag= `<li class="list task" onclick="handleStatus(this)">
                <input type="checkbox"/>
                <span class="pending">${inputVal}</span>
                <i class="fas fa-trash-can" onclick="deleteTask(this)"></i>
            </li>`;

        todoLists.insertAdjacentHTML("beforeend", liTag);
        inputField.value="";
        allTasks();
    showAlert("succes","Added");
    }
});

filter.addEventListener("keyup",(e)=>{
    let filterVal=filter.value.toLowerCase().trim();
    let tasks = document.querySelectorAll(".task");

    if(tasks.length >0){
        tasks.forEach(function(task){
            if(task.textContent.toLowerCase().trim().includes(filterVal)){
                task.setAttribute("style","display : block");
            }else{
                task.setAttribute("style","display : none !important");
            }
        });
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
    showAlert("danger","Deleted");
}

clearBtn.addEventListener("click",()=>{
    if(confirm("Are you sure you want to delete all?")==true){
        todoLists.innerHTML="";
        showAlert("danger","ALL deleted.");
    }
    allTasks();
});

function showAlert(type,message){
    const div = document.createElement("div");
    div.className =`alert bg-${type}`;
    div.textContent=message;
    container.insertAdjacentElement("afterbegin",div);
    setTimeout(function(){
        container.querySelector(".alert").remove();
    },1000);
}