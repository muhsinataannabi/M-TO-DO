// Getting our elements
const input = document.getElementById("newTask");
const addButton = document.getElementById("addButton");
const taskList = document.querySelector('.task');

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task li').forEach(li => {
    tasks.push({
      text: li.querySelector('.task-text').innerText,
      done: li.classList.contains('done')
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    addTask(task.text, task.done);
  });
}

// Add task
function addTask(text, done = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${text}</span>
    <button class="done-btn">✔️</button>
    <button class="delete-btn">🗑</button>
  `;

  if (done) li.classList.add('done');

  const doneBtn = li.querySelector('.done-btn');
  const deleteBtn = li.querySelector('.delete-btn');

  doneBtn.addEventListener('click', () => {
    li.classList.toggle("done");
    saveTasks();
  });

  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
    updateNoTaskMessage();
  });

  taskList.appendChild(li);
  saveTasks();
  updateNoTaskMessage();
}

// Add button click
addButton.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText === "") return;
  addTask(taskText);
  input.value = "";
});

// Add task on Enter key press
input.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    addButton.click();
  }
});

// Load saved tasks on start
loadTasks();
updateNoTaskMessage();

const searchInput = document.getElementById("searchTask");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const allTasks = document.querySelectorAll(".task li");

  allTasks.forEach(task => {
    const taskText = task.querySelector(".task-text").innerText.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

function updateNoTaskMessage(){
  const noTaskMsg = document.getElementById("no-task-msg");
  const taskExit = taskList.children.length > 0;
  noTaskMsg.style.display = taskExit ? "none" : "block";
}
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    // Remove "active" class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const allTasks = document.querySelectorAll(".task li");

    allTasks.forEach(task => {
      const isDone = task.classList.contains("done");

      if (
        filter === "all" ||
        (filter === "done" && isDone) ||
        (filter === "not-done" && !isDone)
      ) {
        task.style.display = "flex";
      } else {
        task.style.display = "none";
      }
    });
  });
});