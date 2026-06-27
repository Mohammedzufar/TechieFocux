import React, { useEffect, useRef, useState } from 'react'

const MUSIC_CATEGORIES = [
  {
    id: 'piano',
    label: 'Piano',
    icon: '🎹',
    loopTrack: false,
    tracks: [
      {
        id: 'piano-1',
        title: 'Calm Piano',
        src: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
      },
      {
        id: 'piano-2',
        title: 'Gymnopedie No. 1',
        src: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Gymnopedie%20No%201.mp3',
      },
      {
        id: 'piano-3',
        title: 'Prelude in C',
        src: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Prelude%20in%20C%20-%20BWV%20846.mp3',
      },
      {
        id: 'piano-4',
        title: 'Thinking Music',
        src: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Thinking%20Music.mp3',
      },
      {
        id: 'piano-5',
        title: 'Comfortable Mystery',
        src: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Comfortable%20Mystery%204.mp3',
      },
    ],
  },
  {
    id: 'nature',
    label: 'Nature',
    icon: '🌿',
    loopTrack: true,
    tracks: [
      {
        id: 'nature-1',
        title: 'Rain',
        src: 'https://assets.mixkit.co/active_storage/sfx/2390/2390-preview.mp3',
      },
      {
        id: 'nature-2',
        title: 'Forest Birds',
        src: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
      },
      {
        id: 'nature-3',
        title: 'River Stream',
        src: 'https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3',
      },
      {
        id: 'nature-4',
        title: 'Wind Trees',
        src: 'https://assets.mixkit.co/active_storage/sfx/2468/2468-preview.mp3',
      },
      {
        id: 'nature-5',
        title: 'Night Crickets',
        src: 'https://assets.mixkit.co/active_storage/sfx/2474/2474-preview.mp3',
      },
      {
        id: 'nature-6',
        title: 'Ocean Waves',
        src: 'https://assets.mixkit.co/active_storage/sfx/2488/2488-preview.mp3',
      },
    ],
  },
]

export default function MusicPlayer() {
  const [categoryId, setCategoryId] = useState('piano')
  const [trackIndex, setTrackIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.45)
  const [status, setStatus] = useState('')
  const audioRef = useRef(null)
  const menuRef = useRef(null)
  const shouldPlayRef = useRef(false)
  const isPlayingRef = useRef(false)

  isPlayingRef.current = isPlaying

  const category = MUSIC_CATEGORIES.find((c) => c.id === categoryId) ?? MUSIC_CATEGORIES[0]
  const currentTrack = category.tracks[trackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const playAudio = async (cat, index, autoplay = true) => {
    const audio = audioRef.current
    const track = cat.tracks[index]
    if (!audio || !track) return

    setStatus('')
    audio.pause()
    audio.src = track.src
    audio.loop = cat.loopTrack
    audio.volume = volume
    audio.load()

    if (!autoplay) {
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
      setStatus('')
    } catch {
      setIsPlaying(false)
      setStatus('Tap play to start')
    }
  }

  useEffect(() => {
    playAudio(category, trackIndex, shouldPlayRef.current)
  }, [categoryId, trackIndex])

  const selectCategory = async (cat) => {
    setIsOpen(false)
    shouldPlayRef.current = true
    setCategoryId(cat.id)
    setTrackIndex(0)
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      shouldPlayRef.current = false
      return
    }

    shouldPlayRef.current = true
    await playAudio(category, trackIndex, true)
  }

  const goToTrack = (direction) => {
    const total = category.tracks.length
    const nextIndex = (trackIndex + direction + total) % total
    shouldPlayRef.current = isPlaying
    setTrackIndex(nextIndex)
  }

  const handleTrackEnded = () => {
    const cat = MUSIC_CATEGORIES.find((c) => c.id === categoryId)
    if (!cat || cat.loopTrack) return
    shouldPlayRef.current = isPlayingRef.current
    setTrackIndex((prev) => (prev + 1) % cat.tracks.length)
  }

  return (
    <div className="music-player" ref={menuRef}>
      <audio ref={audioRef} preload="auto" onEnded={handleTrackEnded} />

      <div className="music-controls">
        <button
          type="button"
          className="nav-btn music-nav-btn"
          onClick={() => goToTrack(-1)}
          aria-label="Previous track"
          title="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
          </svg>
        </button>

        <button
          type="button"
          className="nav-btn music-toggle"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="nav-btn music-nav-btn"
          onClick={() => goToTrack(1)}
          aria-label="Next track"
          title="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 18h2V6h-2v12zm-11-7 8.5-6v12L5 11z" />
          </svg>
        </button>
      </div>

      <div className="music-dropdown-wrap">
        <button
          type="button"
          className="nav-btn music-menu-btn"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          {category.label}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${isOpen ? 'open' : ''}`}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {isOpen && (
          <div className="music-dropdown" role="menu">
            {MUSIC_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="menuitem"
                className={`music-option ${categoryId === cat.id ? 'active' : ''}`}
                onClick={() => selectCategory(cat)}
              >
                <span className="music-option-icon">{cat.icon}</span>
                {cat.label}
                <span className="track-count">{cat.tracks.length} tracks</span>
              </button>
            ))}

            <div className="now-playing">
              <span className="now-playing-label">Now playing</span>
              <span className="now-playing-title">{currentTrack.title}</span>
              <span className="now-playing-index">
                {trackIndex + 1} / {category.tracks.length}
              </span>
            </div>

            <div className="volume-control">
              <label htmlFor="volume">Volume</label>
              <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </div>
            {status && <p className="music-status">{status}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
