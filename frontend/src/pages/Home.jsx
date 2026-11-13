
import { useEffect, useState } from 'react'
import '../App.css'

import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import TaskStats from '../components/TaskStats'

const API_URL = '/api/tasks'

function Home() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getTasks = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error()

      const data = await response.json()
      setTasks(data)
      setError('')
    } catch (err) {
      setError('Sunucuya bağlanılamadı. Express sunucusunu kontrol et.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask.trim() })
      })

      if (!response.ok) throw new Error()

      const task = await response.json()
      setTasks([...tasks, task])
      setNewTask('')
      setError('')
    } catch (err) {
      setError('Görev eklenirken bir hata oluştu.')
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error()

      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      setError('Görev silinirken bir hata oluştu.')
    }
  }

  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !task.completed
        })
      })

      if (!response.ok) throw new Error()

      const updatedTask = await response.json()

      setTasks(tasks.map(item =>
        item.id === task.id ? updatedTask : item
      ))
    } catch (err) {
      setError('Görev güncellenirken bir hata oluştu.')
    }
  }

  const updateTask = async (id) => {
    if (!editingTitle.trim()) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingTitle.trim() })
      })

      if (!response.ok) throw new Error()

      const updatedTask = await response.json()

      setTasks(tasks.map(task =>
        task.id === id ? updatedTask : task
      ))

      setEditingId(null)
      setEditingTitle('')
    } catch (err) {
      setError('Görev düzenlenirken bir hata oluştu.')
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  return (
    <div className="app">
      <header className="header">
        <h1>TASKFLOW</h1>
        <p>Görevlerini planla, işlerini kolaylaştır.</p>
      </header>

      <main className="task-container">
        <h2>Görevlerim</h2>

        <TaskStats tasks={tasks} />

        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />

        <div className="filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tümü
          </button>

          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Bekleyenler
          </button>

          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Tamamlananlar
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Görevler yükleniyor...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="empty">
            {tasks.length === 0
              ? 'Henüz görev eklemedin.'
              : 'Bu kategoride görev bulunmuyor.'}
          </p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            editingId={editingId}
            editingTitle={editingTitle}
            setEditingId={setEditingId}
            setEditingTitle={setEditingTitle}
            updateTask={updateTask}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        )}
      </main>

      <footer>
        TASKFLOW - Görevlerini kolayca yönet.
      </footer>
    </div>
  )
}

export default Home

