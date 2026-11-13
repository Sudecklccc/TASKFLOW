
const fs = require("fs");
const path = require("path");

// Görevlerin kaydedileceği dosya
const dataFile = path.join(__dirname, "../data/tasks.json");

// JSON dosyasından görevleri oku
const loadTasks = () => {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
};

// Görevleri JSON dosyasına kaydet
const saveTasks = (tasks) => {
    fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2), "utf8");
};

// Yeni görev numarasını belirle
let tasks = loadTasks();
let nextId = tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1
    : 1;

// Görevleri listele
const getTasks = (req, res) => {
    res.json(tasks);
};

// Yeni görev ekle
const createTask = (req, res) => {
    const newTask = {
        id: nextId++,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);

    res.status(201).json(newTask);
};

// Görevi güncelle
const updateTask = (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Görev bulunamadı." });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    saveTasks(tasks);
    res.json(task);
};

// Görevi sil
const deleteTask = (req, res) => {
    const id = Number(req.params.id);
    const taskExists = tasks.some(t => t.id === id);

    if (!taskExists) {
        return res.status(404).json({ message: "Görev bulunamadı." });
    }

    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);

    res.json({ message: "Görev silindi." });
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
