function TaskStats({ tasks }) {
  const completedCount = tasks.filter(task => task.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <div className="statistics">
      <div>
        <strong>{tasks.length}</strong>
        <span>Toplam görev</span>
      </div>

      <div>
        <strong>{completedCount}</strong>
        <span>Tamamlanan</span>
      </div>

      <div>
        <strong>{pendingCount}</strong>
        <span>Bekleyen</span>
      </div>
    </div>
  )
}

export default TaskStats