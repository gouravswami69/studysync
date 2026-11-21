
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>StudySync | Student Hub</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<aside class="sidebar">
  <h2>✦ StudySync</h2>
  <p class="muted">STUDENT WORKSPACE</p>
  <button onclick="showPage('dashboard')">▦ Dashboard</button>
  <button onclick="showPage('tasks')">✓ My Tasks</button>
  <button onclick="showPage('timetable')">◷ Timetable</button>
  <button onclick="showPage('notes')">▤ Quick Notes</button>
  <div class="side-bottom">Stay focused.<br><small>Small steps, big results.</small></div>
</aside>

<main>
<header><span>Workspace / <b id="pageName">Dashboard</b></span><button class="theme" onclick="document.body.classList.toggle('dark')">☼ Theme</button></header>

<section id="dashboard" class="page">
  <p class="eyebrow">YOUR PERSONAL STUDY SPACE</p>
  <h1>Make today <span>count.</span></h1>
  <p class="muted">A little progress every day adds up to big results.</p>
  <div class="stats">
    <article><small>Pending tasks</small><h2 id="pending">0</h2></article>
    <article><small>Completed</small><h2 id="completed">0</h2></article>
    <article><small>Quick notes</small><h2 id="noteCount">0</h2></article>
    <article><small>Progress</small><h2 id="progress">0%</h2></article>
  </div>
  <div class="panel">
    <h2>Today's tasks</h2>
    <div id="todayTasks"></div>
    <button class="add" onclick="showPage('tasks')">＋ Manage tasks</button>
  </div>
  <div class="panel">
    <h2>Today's timetable</h2>
    <div id="todaySchedule"></div>
  </div>
  <div class="quote">“The secret of getting ahead is getting started.”<br><small>— Mark Twain</small></div>
</section>

<section id="tasks" class="page hidden">
  <p class="eyebrow">GET THINGS DONE</p><h1>My Tasks</h1>
  <div class="panel">
    <form id="taskForm">
      <input id="taskTitle" placeholder="Enter your task..." required>
      <input id="taskDate" type="date" required>
      <select id="priority"><option>Medium</option><option>High</option><option>Low</option></select>
      <button class="primary">＋ Add Task</button>
    </form>
    <div id="taskList"></div>
  </div>
</section>

<section id="timetable" class="page hidden">
  <p class="eyebrow">PLAN YOUR DAY</p><h1>My Timetable</h1>
  <div class="panel">
    <form id="scheduleForm">
      <input id="activity" placeholder="Activity / Subject" required>
      <input id="startTime" type="time" required>
      <input id="endTime" type="time" required>
      <button class="primary">＋ Add Slot</button>
    </form>
    <div id="scheduleList"></div>
  </div>
</section>

<section id="notes" class="page hidden">
  <p class="eyebrow">SAVE YOUR IDEAS</p><h1>Quick Notes</h1>
  <div class="panel">
    <form id="noteForm">
      <input id="noteTitle" placeholder="Note title" required>
      <textarea id="noteBody" placeholder="Write your note..." required></textarea>
      <button class="primary">＋ Save Note</button>
    </form>
    <div id="notesList"></div>
  </div>
</section>
</main>
<script src="js/app.js"></script>
</body>
</html>
