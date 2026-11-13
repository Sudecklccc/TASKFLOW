
function TaskList({
  tasks,
  editingId,
  editingTitle,
  setEditingId,
  setEditingTitle,
  updateTask,
  deleteTask,
  toggleTask
}) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div className="task-item" key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
          />

          {editingId === task.id ? (
            <input
              className="edit-input"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') updateTask(task.id)
              }}
            />
          ) : (
            <span className={task.completed ? 'completed' : ''}>
              {task.title}
            </span>
          )}

          <div className="task-actions">
            {editingId === task.id ? (
              <button onClick={() => updateTask(task.id)}>
                Kaydet
              </button>
            ) : (
              <button onClick={() => {
                setEditingId(task.id)
                setEditingTitle(task.title)
              }}>
                Düzenle
              </button>
            )}

            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
