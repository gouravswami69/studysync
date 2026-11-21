
/* =================================
   STUDYSYNC - APPLICATION JAVASCRIPT
   ================================= */

const STORAGE = {
  tasks: "studysync_tasks",
  schedules: "studysync_schedules",
  notes: "studysync_notes"
};

function loadData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

let tasks = loadData(STORAGE.tasks);
let schedules = loadData(STORAGE.schedules);
let notes = loadData(STORAGE.notes);

function saveData() {
  localStorage.setItem(STORAGE.tasks, JSON.stringify(tasks));
  localStorage.setItem(STORAGE.schedules, JSON.stringify(schedules));
  localStorage.setItem(STORAGE.notes, JSON.stringify(notes));
}

function todayDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function makeButton(label, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", action);
  if (id) button.dataset.id = id;
  return button;
}

/* PAGE NAVIGATION */

function showPage(pageName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
  });

  const selectedPage = document.getElementById(pageName);
  if (selectedPage) {
    selectedPage.classList.remove("hidden");
  }

  document.querySelectorAll(".sidebar button").forEach(button => {
    button.classList.remove("active");
    if (button.getAttribute("onclick")?.includes(pageName)) {
      button.classList.add("active");
    }
  });

  const pageTitle = document.getElementById("pageName");
  if (pageTitle) {
    const names = {
      dashboard: "Dashboard",
      tasks: "My Tasks",
      timetable: "Timetable",
      notes: "Quick Notes"
    };
    pageTitle.textContent = names[pageName] || "StudySync";
  }
}

window.showPage = showPage;

/* TASKS */

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.replaceChildren();

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No tasks yet. Add your first task!";
    list.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = `${task.completed ? "✓ " : ""}${task.title}`;
    if (task.completed) title.style.textDecoration = "line-through";

    const details = document.createElement("p");
    details.textContent =
      `Due: ${task.date || "No date"} | Priority: ${task.priority || "Normal"}`;

    const completeButton = makeButton(
      task.completed ? "Undo" : "Complete",
      () => {
        task.completed = !task.completed;
        saveData();
        renderAll();
      }
    );

    const deleteButton = makeButton("Delete", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveData();
      renderAll();
    });

    item.append(title, details, completeButton, deleteButton);
    list.appendChild(item);
  });
}

/* TIMETABLE */

function renderSchedules() {
  const list = document.getElementById("scheduleList");
  if (!list) return;

  list.replaceChildren();

  if (schedules.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No timetable activities added yet.";
    list.appendChild(empty);
    return;
  }

  schedules.forEach(schedule => {
    const item = document.createElement("li");

    const activity = document.createElement("strong");
    activity.textContent = schedule.activity;

    const time = document.createElement("p");
    time.textContent =
      `${schedule.startTime || "--:--"} - ${schedule.endTime || "--:--"}`;

    const deleteButton = makeButton("Delete", () => {
      schedules = schedules.filter(s => s.id !== schedule.id);
      saveData();
      renderAll();
    });

    item.append(activity, time, deleteButton);
    list.appendChild(item);
  });
}

/* NOTES */

function renderNotes() {
  const list = document.getElementById("notesList");
  if (!list) return;

  list.replaceChildren();

  if (notes.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No notes saved yet. Write your first note!";
    list.appendChild(empty);
    return;
  }

  notes.forEach(note => {
    const item = document.createElement("li");

    const title = document.createElement("strong");
    title.textContent = note.title;

    const body = document.createElement("p");
    body.textContent = note.body;

    const deleteButton = makeButton("Delete", () => {
      notes = notes.filter(n => n.id !== note.id);
      saveData();
      renderAll();
    });

    item.append(title, body, deleteButton);
    list.appendChild(item);
  });
}

/* DASHBOARD */

function renderDashboard() {
  const pending = document.getElementById("pending");
  const completed = document.getElementById("completed");
  const noteCount = document.getElementById("noteCount");
  const progress = document.getElementById("progress");

  const done = tasks.filter(task => task.completed).length;
  const remaining = tasks.length - done;
  const percentage = tasks.length
    ? Math.round((done / tasks.length) * 100)
    : 0;

  if (pending) pending.textContent = remaining;
  if (completed) completed.textContent = done;
  if (noteCount) noteCount.textContent = notes.length;

  if (progress) {
    if ("value" in progress) {
      progress.value = percentage;
      progress.max = 100;
    } else {
      progress.textContent = `${percentage}%`;
    }
  }

  const todayTasks = document.getElementById("todayTasks");
  if (todayTasks) {
    todayTasks.replaceChildren();

    const todays = tasks.filter(task => task.date === todayDate());

    if (!todays.length) {
      const empty = document.createElement("li");
      empty.textContent = "No tasks due today.";
      todayTasks.appendChild(empty);
    } else {
      todays.forEach(task => {
        const item = document.createElement("li");
        item.textContent =
          `${task.completed ? "✓ " : "• "}${task.title}`;
        todayTasks.appendChild(item);
      });
    }
  }

  const todaySchedule = document.getElementById("todaySchedule");
  if (todaySchedule) {
    todaySchedule.replaceChildren();

    if (!schedules.length) {
      const empty = document.createElement("li");
      empty.textContent = "No activities in your timetable.";
      todaySchedule.appendChild(empty);
    } else {
      schedules.forEach(schedule => {
        const item = document.createElement("li");
        item.textContent =
          `${schedule.startTime || "--:--"} - ${schedule.endTime || "--:--"}: ${schedule.activity}`;
        todaySchedule.appendChild(item);
      });
    }
  }
}

/* FORM EVENTS */

function setupForms() {
  const taskForm = document.getElementById("taskForm");

  if (taskForm) {
    taskForm.addEventListener("submit", event => {
      event.preventDefault();

      const title = document.getElementById("taskTitle")?.value.trim();
      const date = document.getElementById("taskDate")?.value || "";
      const priority = document.getElementById("priority")?.value || "Normal";

      if (!title) return;

      tasks.push({
        id: Date.now().toString(),
        title,
        date,
        priority,
        completed: false
      });

      saveData();
      taskForm.reset();
      renderAll();
    });
  }

  const scheduleForm = document.getElementById("scheduleForm");

  if (scheduleForm) {
    scheduleForm.addEventListener("submit", event => {
      event.preventDefault();

      const activity = document.getElementById("activity")?.value.trim();
      const startTime = document.getElementById("startTime")?.value || "";
      const endTime = document.getElementById("endTime")?.value || "";

      if (!activity) return;

      schedules.push({
        id: Date.now().toString(),
        activity,
        startTime,
        endTime
      });

      saveData();
      scheduleForm.reset();
      renderAll();
    });
  }

  const noteForm = document.getElementById("noteForm");

  if (noteForm) {
    noteForm.addEventListener("submit", event => {
      event.preventDefault();

      const title = document.getElementById("noteTitle")?.value.trim();
      const body = document.getElementById("noteBody")?.value.trim();

      if (!title || !body) return;

      notes.push({
        id: Date.now().toString(),
        title,
        body
      });

      saveData();
      noteForm.reset();
      renderAll();
    });
  }
}

/* INITIALIZE */

function renderAll() {
  renderTasks();
  renderSchedules();
  renderNotes();
  renderDashboard();
}

function initStudySync() {
  setupForms();
  renderAll();
  showPage("dashboard");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStudySync);
} else {
  initStudySync();
}
