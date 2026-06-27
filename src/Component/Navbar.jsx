import React from 'react'
import MusicPlayer from './MusicPlayer'
import PomodoroTimer from './PomodoroTimer'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ theme, onThemeToggle }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">◉</span>
          <span className="brand-text">Techie Focux</span>
        </div>

        <div className="navbar-controls">
          <MusicPlayer />
          <PomodoroTimer />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </nav>
  )
}
