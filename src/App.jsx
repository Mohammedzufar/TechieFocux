import React, { useEffect, useState } from 'react'
import BackgroundVideo from './Component/BackgroundVideo'
import Navbar from './Component/Navbar'
import Taskform from './Component/Taskform'
import Tasklist from './Component/Tasklist'
import ProgressTracker from './Component/Progresstracker'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('focux-theme') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('focux-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const addTask = (task) => {
    setTasks([...tasks, task])
  }

  const updateTask = (updatedTask, index) => {
    const newtasks = [...tasks]
    newtasks[index] = updatedTask
    setTasks(newtasks)
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const clearTasks = () => {
    setTasks([])
  }

  return (
    <div className="app">
      <BackgroundVideo />
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      <main className="app-container">
        <header className="app-header">
          <h1>
            Tech<i>ie</i> Focux
          </h1>
          <p className="app-subtitle">Your calm, friendly focus & task manager</p>
        </header>

        <section className="card task-section">
          <Taskform addTask={addTask} />
        </section>

        <section className="card task-section">
          <h2 className="section-title">Your Tasks</h2>
          <Tasklist
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </section>

        <section className="card progress-section">
          <ProgressTracker tasks={tasks} />
        </section>

        {tasks.length > 0 && (
          <button onClick={clearTasks} className="clear-btn">
            Clear All Tasks
          </button>
        )}
      </main>
    </div>
  )
}
