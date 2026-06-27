import React from 'react'

export default function BackgroundVideo() {
  return (
    <div className="video-background" aria-hidden="true">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/photos/768125/pexels-photo-768125.jpeg?auto=compress&cs=tinysrgb&w=1920"
      >
        <source
          src="https://videos.pexels.com/video-files/3129675/3129675-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://cdn.coverr.co/videos/coverr-studying-at-a-desk-1578/1080p.mp4"
          type="video/mp4"
        />
      </video>
      <div className="video-overlay" />
    </div>
  )
}
