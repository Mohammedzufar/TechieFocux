import React from 'react'

export default function ProgressTracker({ tasks }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h2 className="section-title">Progress</h2>
        <p className="progress-stats">
          <strong>{completedTasks}</strong> of <strong>{totalTasks}</strong> tasks completed
        </p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          <span className="progress-label">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  )
}
