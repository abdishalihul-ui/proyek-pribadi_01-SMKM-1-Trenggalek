// Mengambil elemen HTML
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskDate = document.getElementById("taskDate");
const taskContainer = document.getElementById("taskContainer");

// Mengambil data tugas dari penyimpanan browser
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (error) {
    tasks = [];
}

// Menyimpan tugas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Menampilkan daftar tugas
function displayTasks() {
    taskContainer.innerHTML = "";

    if (tasks.length === 0) {
        taskContainer.innerHTML =
            '<p class="empty">Belum ada tugas.</p>';
        return;
    }

    tasks.forEach(function(task) {
        const item = document.createElement("div");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.name;

        const date = document.createElement("p");
        date.textContent = "Deadline: " + task.date;

        info.appendChild(title);
        info.appendChild(date);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const doneButton = document.createElement("button");
        doneButton.className = "done-btn";
        doneButton.textContent = task.completed
            ? "Batal"
            : "Selesai";

        doneButton.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Hapus";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(t) {
                return t.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        actions.appendChild(doneButton);
        actions.appendChild(deleteButton);

        item.appendChild(info);
        item.appendChild(actions);

        taskContainer.appendChild(item);
    });
}

// Menambahkan tugas baru
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newTask = {
        id: Date.now(),
        name: taskName.value.trim(),
        date: taskDate.value,
        completed: false
    };

    if (!newTask.name || !newTask.date) {
        alert("Nama tugas dan deadline harus diisi!");
        return;
    }

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskForm.reset();

    alert("Tugas berhasil ditambahkan!");
});

// Menampilkan tugas ketika website dibuka
displayTasks();
