const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const totalTodos = document.getElementById("totalTodos");
const completedTodos = document.getElementById("completedTodos");

let todoCount = 0;
let completedCount = 0;

function addTask() {
  if (inputBox.value === "") {
    alert("You must write some Task!");
  } else {
    let newTask = document.createElement("li");
    newTask.innerHTML = ` 
        ${inputBox.value}
        <button class="editbtn" onclick="editTask(this.parentNode)"></button>
        <button class="deletebtn" onclick="deleteTask(this.parentNode)"></button>
        `;
    listContainer.appendChild(newTask);
    todoCount++;
    totalTodos.textContent = todoCount;
  }
  inputBox.value = "";
  storeTask();
}

listContainer.addEventListener(
  "click",
  function (action) {
    if (action.target.tagName === "LI") {
      action.target.classList.toggle("checked");
      if (action.target.classList.contains("checked")) {
        completedCount++;
      } else {
        completedCount--;
      }
      completedTodos.textContent = completedCount;
      storeTask();
    }
  },
  false
);

function editTask(taskElement) {
  if (taskElement.classList.contains("checked")) {
    alert("You cannot edit a completed task.");
    return;
  }

  let taskText = taskElement.childNodes[0].textContent.trim();
  let newTextUpdate = prompt("How do you want to change it?", taskText);

  if (newTextUpdate !== null && newTextUpdate !== "") {
    taskElement.childNodes[0].textContent = newTextUpdate;
  }

  if (taskElement.querySelector(".editbtn") === null) {
    taskElement.innerHTML += `
            <button class="editbtn" onclick="editTask(this.parentNode)"></button>
            <button class="deletebtn" onclick="deleteTask(this.parentNode)"></button>
        `;
  }
  storeTask();
}

function deleteTask(taskElement) {
  taskElement.remove();
  todoCount--;
  totalTodos.textContent = todoCount;
  if (taskElement.classList.contains("checked")) {
    completedCount--;
    completedTodos.textContent = completedCount;
  }
  storeTask();
}

function storeTask() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function displayTask() {
  listContainer.innerHTML = localStorage.getItem("tasks");

  todoCount = listContainer.querySelectorAll("li").length;
  completedCount = listContainer.querySelectorAll(".checked").length;

  totalTodos.textContent = todoCount;
  completedTodos.textContent = completedCount;
}

displayTask();
