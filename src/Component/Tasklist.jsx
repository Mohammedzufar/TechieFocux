import React from 'react'

const priorityClass = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
}

export default function Tasklist({ tasks, updateTask, deleteTask }) {
  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed }
    updateTask(updatedTask, index)
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">✦</span>
        <p>No tasks yet. Add one above to start your focus session.</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task, index) => {
        const priority = (task.priority || 'medium').toLowerCase()
        return (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              <span className={`priority-dot ${priorityClass[priority] || 'priority-medium'}`} />
              <div className="task-text-wrap">
                <span className="task-text">{task.text || task.task}</span>
                <small className="task-meta">
                  {task.priority} · {task.category}
                </small>
              </div>
            </div>
            <div className="task-actions">
              <button
                type="button"
                className="btn-action complete-btn"
                onClick={() => toggleComplete(index)}
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button
                type="button"
                className="btn-action delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
