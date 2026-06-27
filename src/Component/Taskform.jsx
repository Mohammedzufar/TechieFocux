import React, { useState } from 'react'

export default function Taskform({ addTask }) {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [category, setCategory] = useState('General')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.trim()) return

    addTask({ text: task.trim(), priority, category, completed: false })

    setTask('')
    setPriority('Medium')
    setCategory('General')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row main-row">
        <input
          type="text"
          placeholder="What do you want to focus on?"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          className="task-input"
        />
        <button type="submit" className="btn-primary">
          Add Task
        </button>
      </div>

      <div className="form-row options-row">
        <label className="select-wrap">
          <span>Priority</span>
          <select onChange={(e) => setPriority(e.target.value)} value={priority}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label className="select-wrap">
          <span>Category</span>
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </label>
      </div>
    </form>
  )
}
