
const studentInfo = {
    id: "NA-41A7E0",
    name: "MD NAIMUL ALAM",
    birthMonth: 10,
    favoriteColor: "BLACK"
};

console.log(`${studentInfo.name}'s Task Manager (ID: ${studentInfo.id})`);
console.log(`Birth Month: ${studentInfo.birthMonth}, Favorite Color: ${studentInfo.favoriteColor}\n`);


class Task {
    constructor(title, description, dueDate, category, priority = 3) {
        this.id = `${studentInfo.id}_${Date.now()}`;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.createdDate = new Date();
        this.dueDate = new Date(dueDate);
        this.category = category;
    }
}


let tasks = [];

function createTask(title, description, dueDate, category, priority) {
    const task = new Task(title, description, dueDate, category, priority);
    tasks.push(task);
    console.log(`Task created: "${task.title}" (Priority: ${task.priority})`);
}


function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    console.log(`Task deleted (ID: ${taskId})`);
}

function displayTasks(filterBy = "all") {
    console.log("\nDisplaying tasks:");
    tasks.forEach(task => {
        if (filterBy === "completed" && !task.completed) return;
        if (filterBy === "pending" && task.completed) return;

        console.log(`- Task ID: ${task.id}\n  Title: ${task.title}\n  Status: ${task.completed ? "Completed" : "Pending"}`);
    });
}

const calculateTasksPercentage = () => {
    if (tasks.length === 0) return "No tasks!";
    const completed = tasks.filter(task => task.completed).length;
    return `${(completed / tasks.length * 100).toFixed(2)}% completed`;
};

function displayBirthMonthTasks() {
    console.log(`\nTasks created in your birth month (${studentInfo.birthMonth}):`);
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].createdDate.getMonth() + 1 === studentInfo.birthMonth) {
            console.log(`- ${tasks[i].title}`);
        }
    }
}

function saveTasksToStorage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Tasks saved successfully!");
        }, studentInfo.birthMonth * 100);
    });
}

async function loadUserTasks() {
    try {
        console.log("\nLoading tasks asynchronously...");
        const response = await saveTasksToStorage();
        console.log(` ${response}`);
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

console.log("Initializing with dummy data...\n");

createTask("MD NAIMUL ALAM Project Report", "Task includes ID: NA-41A7E0", "1994-10-16", "Work", 2);
createTask("Study for Finals", "Exam prep for ID: NA-41A7E0", "2025-09-30", "Study", 1);
createTask("Md NAIMUL ALAM Grocery Shopping", "Buy essentials", "2025-09-28", "Personal", 3);
createTask("Birthday Party Planning", "Plan for Octobar", "2025-10-16", "Event", 4);
createTask("Coding Practice", "Improve JS skills", "2025-10-01", "Learning", 5);

displayTasks("all");

displayBirthMonthTasks();

tasks[1].completed = true;
console.log(`\n Task "${tasks[1].title}" marked as completed`);

deleteTask(tasks[2].id);

console.log("Progress:", calculateTasksPercentage());

loadUserTasks();
