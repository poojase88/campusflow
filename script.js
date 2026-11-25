
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) {
        alert("Please enter a task!");
        return;
    }

    tasks.push({ text: text, completed: false });
    input.value = "";
    saveTasks();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");

        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        const done = document.createElement("button");
        done.textContent = task.completed ? "Undo" : "Done";

        done.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };

        const remove = document.createElement("button");
        remove.textContent = "Delete";

        remove.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
        };

        li.append(span, done, remove);
        list.appendChild(li);
    });

    updateProgress();
}

function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percentage = total
        ? Math.round(completed / total * 100)
        : 0;

    document.getElementById("progress").textContent =
        percentage + "% Completed";

    document.getElementById("progressBar").style.width =
        percentage + "%";
}

let time = 25 * 60;
let timerInterval = null;

function updateTimer() {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    document.getElementById("timer").textContent =
        String(min).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0");
}

function startTimer() {
    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimer();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Focus session completed!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 25 * 60;
    updateTimer();
}

displayTasks();
updateTimer();
