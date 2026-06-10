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

function labelLayout(layout) {
  return `Layout ${layout.replace("layout", "")}`;
}

function videoPath(task, layout, robot, method) {
  return `assets/videos/real_world/${task}_${layout}_${robot}_${method}.mp4`;
}

function updateTaskVideos(taskSection, layout) {
  const task = taskSection.dataset.task;
  taskSection.querySelectorAll("video").forEach((video) => {
    const { robot, method } = video.dataset;
    video.pause();
    video.src = videoPath(task, layout, robot, method);
    video.load();
    video.play().catch(() => {
      // Browser autoplay policies can still block playback in some contexts.
    });
  });
}

function setTaskLayout(taskSection, layout) {
  taskSection.dataset.layout = layout;
  taskSection.querySelectorAll(".layout-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.layout === layout);
  });
  updateTaskVideos(taskSection, layout);
}

function renderLayoutTabs(taskSection) {
  const task = taskSection.dataset.task;
  const container = taskSection.querySelector(".layout-tabs");
  if (!taskConfig[task] || !container) return;

  container.replaceChildren();
  taskConfig[task].layouts.forEach((layout) => {
    const button = document.createElement("button");
    button.className = "layout-tab";
    button.type = "button";
    button.dataset.layout = layout;
    button.textContent = labelLayout(layout);
    button.addEventListener("click", () => setTaskLayout(taskSection, layout));
    container.appendChild(button);
  });

  setTaskLayout(taskSection, taskConfig[task].layouts[0]);
}

document.querySelectorAll(".real-task").forEach(renderLayoutTabs);
