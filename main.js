document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-buttons button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            if (
                filter === 'all' ||
                (filter === 'active' && !task.completed) ||
                (filter === 'completed' && task.completed)
            ) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button onclick="toggleComplete(${index})">
                            ${task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onclick="deleteTask(${index})">Delete</button>
                    </div>
                `;
                if (task.completed) {
                    li.classList.add('completed');
                }
                taskList.appendChild(li);
            }
        });
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.id;
            renderTasks(filter);
        });
    });

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    renderTasks();
});





