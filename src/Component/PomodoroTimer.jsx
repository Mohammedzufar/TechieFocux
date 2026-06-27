import React, { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_MINUTES = 25

function playCompletionSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime

    ;[523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, now + i * 0.15)
      gain.gain.linearRampToValueAtTime(0.25, now + i * 0.15 + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.6)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now + i * 0.15)
      osc.stop(now + i * 0.15 + 0.65)
    })

    setTimeout(() => ctx.close(), 2000)
  } catch {
    /* audio not available */
  }
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function PomodoroTimer() {
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_MINUTES * 60)
  const [remaining, setRemaining] = useState(DEFAULT_MINUTES * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearTimer()
          setIsRunning(false)
          setIsComplete(true)
          playCompletionSound()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return clearTimer
  }, [isRunning, clearTimer])

  const toggleTimer = () => {
    if (remaining === 0) {
      setRemaining(totalSeconds)
      setIsComplete(false)
    }
    setIsRunning((prev) => !prev)
  }

  const resetTimer = () => {
    clearTimer()
    setIsRunning(false)
    setIsComplete(false)
    setRemaining(totalSeconds)
  }

  const setDuration = (minutes) => {
    const seconds = minutes * 60
    clearTimer()
    setIsRunning(false)
    setIsComplete(false)
    setTotalSeconds(seconds)
    setRemaining(seconds)
  }

  const progress = totalSeconds === 0 ? 0 : ((totalSeconds - remaining) / totalSeconds) * 100

  return (
    <div className={`pomodoro-timer ${isComplete ? 'complete' : ''} ${isRunning ? 'running' : ''}`}>
      <div className="timer-ring">
        <svg viewBox="0 0 36 36" className="timer-svg">
          <path
            className="timer-ring-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="timer-ring-fill"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="timer-display">{formatTime(remaining)}</span>
      </div>

      <div className="timer-actions">
        <button type="button" className="nav-btn timer-btn" onClick={toggleTimer}>
          {isRunning ? 'Pause' : remaining === 0 ? 'Restart' : 'Start'}
        </button>
        <button type="button" className="nav-btn timer-btn secondary" onClick={resetTimer}>
          Reset
        </button>
      </div>

      <div className="timer-presets">
        {[25, 15, 5].map((min) => (
          <button
            key={min}
            type="button"
            className={`preset-btn ${totalSeconds === min * 60 ? 'active' : ''}`}
            onClick={() => setDuration(min)}
          >
            {min}m
          </button>
        ))}
      </div>

      {isComplete && <span className="timer-done-msg">Focus session complete!</span>}
    </div>
  )
}
