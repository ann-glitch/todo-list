const alterCount = function (arg) {
  arg == "add" ? (taskNumber += 1) : (taskNumber -= 1);
};

let addNewTask = document.getElementById("addNewTask");
let todoContainer = document.querySelector(".todo-container");
let inputField = document.getElementById("input-task");

const parseDateTime = function () {
  const dateTime = /(\w{3}) (\w{3}) (\d{2}) (\d{4})/.exec(new Date());
  return {
    day: dateTime[1],
    month: dateTime[2],
    date: dateTime[3],
    year: dateTime[4],
  };
};

const createTask = function (name) {
  const dateTime = parseDateTime();
  let task = document.createElement("li");
  task.addClassList = ".line-styling";
  task.setAttribute("data-id", taskNumber);
  task.innerHTML = `<input id="checkbox" type="checkbox">
            <label>${name}</label>
            <span>${dateTime.day} ${dateTime.month} ${dateTime.date} ${dateTime.year}</span>
            <input type="text" class="editBox">
            <button class="edit">Edit</button>
            <button style="display:none;" class="saveChanges">Save</button>
            <button class="delete">Delete</button>
        `;
  return task;
};

let taskNumber = 0;

const addTask = function () {
  // add new task
  const taskName = inputField.value;
  if (taskName !== "") {
    console.log(`adding a new Task With id ${taskNumber}`);
    const task = createTask(taskName);
    todoContainer.appendChild(task);
    alterCount("add");
    bindEvents(task);
    inputField.value = "";
  } else {
    console.log("input box is empty");
  }
};

// add task on press on enter key
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    addTask();
  }
});

// add task on button press
addNewTask.addEventListener("click", (e) => {
  addTask();
});

const deleteTask = function (parent, taskId) {
  // find the correct task using it's id and remove it from the parent
  console.log(`deleting Task ${taskId}`);
  const trash = document.querySelector(`li[data-id="${taskId}"]`);
  trash.parentElement.removeChild(trash);
  alterCount("subtract");
};

const editTask = function ({ editBox, taskName, saveBtn }) {
  // hide the label and toggle the edit box
  taskName.style.display = "none";
  editBox.style.display = "block";
  saveBtn.style.display = "block";
  editBox.value = taskName.innerText;
};

const saveFunc = function ({ editBox, saveBtn, taskName }) {
  // save changes and hide button and edit box
  console.log(editBox.value);
  taskName.innerText = editBox.value;
  editBox.style.display = "none";
  saveBtn.style.display = "none";
  taskName.style.display = "block";
};

function bindEvents(task) {
  const taskComponents = Array.from(task.children);
  const taskName = taskComponents.find((el) => el.nodeName == "LABEL");
  const editBtn = taskComponents.find((el) => el.className == "edit");
  const deleteBtn = taskComponents.find((el) => el.className == "delete");
  const editBox = taskComponents.find((el) => el.className == "editBox");
  const saveBtn = taskComponents.find((el) => el.className == "saveChanges");

  const payload = {
    saveBtn,
    editBox,
    taskName,
  }; // these variables are needed by the two helper functions below in order for them to work

  deleteBtn.addEventListener("click", (e) => {
    // for every delete button created, bind a function that deletes the respective task
    const parentElement = e.target.parentElement;
    const elementId = e.target.parentElement.getAttribute("data-id");
    deleteTask(parentElement, elementId);
  });

  editBtn.addEventListener("click", (e) => {
    // onclick on edit button, enable editing and show save button
    editTask(payload);
  });

  saveBtn.addEventListener("click", (e) => {
    // after changes have been made in the edit box, hide the editbox, save button and reveal the label
    saveFunc(payload);
  });
}
