function TaskForm({ newTask, setNewTask, addTask }) {
  return (
    <form className="task-input" onSubmit={addTask}>
      <input
        type="text"
        placeholder="Yeni görevini yaz..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button type="submit">+ Görev Ekle</button>
    </form>
  )
}

export default TaskForm