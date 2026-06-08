const taskConfig = {
  coffee: {
    layouts: ["layout1", "layout2", "layout3"],
  },
  flower: {
    layouts: ["layout1", "layout2", "layout3", "layout4"],
  },
  banana: {
    layouts: ["layout1", "layout2", "layout3"],
  },
};

const videoSlots = [
  { id: "ur5-base", robot: "ur5", method: "base" },
  { id: "ur5-embodisteer", robot: "ur5", method: "embodisteer" },
  { id: "franka-base", robot: "franka", method: "base" },
  { id: "franka-embodisteer", robot: "franka", method: "embodisteer" },
];

let currentTask = "coffee";
let currentLayout = "layout1";

function labelLayout(layout) {
  return `Layout ${layout.replace("layout", "")}`;
}

function videoPath(task, layout, robot, method) {
  return `assets/videos/real_world/${task}_${layout}_${robot}_${method}.mp4`;
}

function renderLayoutTabs() {
  const container = document.querySelector(".layout-tabs");
  if (!container) return;

  container.replaceChildren();
  taskConfig[currentTask].layouts.forEach((layout) => {
    const button = document.createElement("button");
    button.className = "layout-tab";
    button.type = "button";
    button.dataset.layout = layout;
    button.textContent = labelLayout(layout);
    button.addEventListener("click", () => setSelection(currentTask, layout));
    container.appendChild(button);
  });
}

function updateVideos() {
  videoSlots.forEach(({ id, robot, method }) => {
    const video = document.getElementById(id);
    if (!video) return;
    video.pause();
    video.src = videoPath(currentTask, currentLayout, robot, method);
    video.load();
  });
}

function updateActiveControls() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.task === currentTask);
  });

  document.querySelectorAll(".layout-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.layout === currentLayout);
  });
}

function setSelection(taskName, layoutName = "layout1") {
  if (!taskConfig[taskName]) return;

  currentTask = taskName;
  currentLayout = taskConfig[taskName].layouts.includes(layoutName)
    ? layoutName
    : taskConfig[taskName].layouts[0];

  renderLayoutTabs();
  updateActiveControls();
  updateVideos();
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => setSelection(button.dataset.task));
});

setSelection(currentTask, currentLayout);
