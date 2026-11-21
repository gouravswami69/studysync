
const $ = (id) => document.getElementById(id);

let tasks = JSON.parse(localStorage.getItem("studyTasks") || "[]");
let schedules = JSON.parse(localStorage.getItem("studySchedules") || "[]");
let notes = JSON.parse(localStorage.getItem("studyNotes") || "[]");

function saveData() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
  localStorage.setItem("studySchedules", JSON.stringify(schedules));
  localStorage.setItem("studyNotes", JSON.stringify(notes));
}

function updateStats() {
  const completed = tasks.filter(t => t.done).length;
  $("pending").textContent = tasks.length - completed;
  $("completed").textContent = completed;
  $("noteCount").textContent = notes.length;

  const progress = tasks.length
    ? Math.round(completed / tasks.length * 100)
    : 0;

  $("progress").textContent = progress + "%";
}

function renderTasks() {
  $("taskList").innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const info = document.createElement("span");
    info.textContent = `${task.title} | ${task.date || "No date"} | ${task.priority}`;

    const complete = document.createElement("button");
    complete.textContent = task.done ? "Undo" : "Done";
    complete.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveData();
      renderAll();
    };

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.onclick = () => {
      tasks.splice(index, 1);
      saveData();
      renderAll();
    };

    li.append(info, complete, remove);
    $("taskList").appendChild(li);
  });
}

function renderSchedules() {
  $("scheduleList").innerHTML = "";

  schedules.forEach((item, index) => {
    const li = document.createElement("li");
    const info = document.createElement("span");
    info.textContent = `${item.activity} | ${item.start} - ${item.end}`;

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.onclick = () => {
      schedules.splice(index, 1);
      saveData();
      renderAll();
    };

    li.append(info, remove);
    $("scheduleList").appendChild(li);
  });
}

function renderNotes() {
  $("notesList").innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    const info = document.createElement("span");
    info.textContent = `${note.title}: ${note.body}`;

    const remove = document.createElement("button");
    remove.textContent = "Delete";
    remove.onclick = () => {
      notes.splice(index, 1);
      saveData();
      renderAll();
    };

    li.append(info, remove);
    $("notesList").appendChild(li);
  });
}

function renderAll() {
  renderTasks();
  renderSchedules();
  renderNotes();
  updateStats();
}

$("taskForm").addEventListener("submit", event => {
  event.preventDefault();

  const title = $("taskTitle").value.trim();
  if (!title) return;

  tasks.push({
    title,
    date: $("taskDate").value,
    priority: $("priority").value,
    done: false
  });

  saveData();
  $("taskForm").reset();
  renderAll();
});

$("scheduleForm").addEventListener("submit", event => {
  event.preventDefault();

  const activity = $("activity").value.trim();
  if (!activity) return;

  schedules.push({
    activity,
    start: $("startTime").value,
    end: $("endTime").value
  });

  saveData();
  $("scheduleForm").reset();
  renderAll();
});

$("noteForm").addEventListener("submit", event => {
  event.preventDefault();

  const title = $("noteTitle").value.trim();
  const body = $("noteBody").value.trim();
  if (!title || !body) return;

  notes.push({ title, body });

  saveData();
  $("noteForm").reset();
  renderAll();
});

renderAll();
