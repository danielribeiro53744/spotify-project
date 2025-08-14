'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMusic } from '@/contexts/MusicContext';
import { getImageUrl, formatDuration } from '@/lib/spotify-client';

const MusicPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    volume, 
    togglePlayPause, 
    setVolume, 
    seekTo 
  } = useMusic();

  if (!currentTrack) {
    return null;
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = clickX / width;
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  return (
    <div className="music-player">
      <Container fluid>
        <Row className="align-items-center">
          {/* Track Info */}
          <Col md={3} className="d-flex align-items-center">
            {currentTrack.album.images.length > 0 ? (
              <img
                src={getImageUrl(currentTrack.album.images, 'small')}
                alt={currentTrack.album.name}
                className="me-3"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div 
                className="me-3"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'var(--primary-purple)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                🎵
              </div>
            )}
            <div>
              <div className="fw-semibold">{currentTrack.name}</div>
              <div className="text-muted small">
                {currentTrack.artists.map(artist => artist.name).join(', ')}
              </div>
            </div>
          </Col>

          {/* Player Controls */}
          <Col md={6} className="text-center">
            <div className="d-flex justify-content-center align-items-center">
              <Button variant="link" className="text-muted me-3">
                ⏮️
              </Button>
              <Button 
                variant="primary" 
                className="rounded-circle"
                style={{ width: '50px', height: '50px' }}
                onClick={togglePlayPause}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </Button>
              <Button variant="link" className="text-muted ms-3">
                ⏭️
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-2 d-flex align-items-center">
              <small className="text-muted me-2">{formatDuration(currentTime * 1000)}</small>
              <div 
                className="flex-grow-1 bg-secondary position-relative"
                style={{ height: '4px', borderRadius: '2px', cursor: 'pointer' }}
                onClick={handleProgressClick}
              >
                <div 
                  className="bg-primary h-100"
                  style={{ 
                    width: duration ? `${(currentTime / duration) * 100}%` : '0%', 
                    borderRadius: '2px',
                    transition: 'width 0.1s ease'
                  }}
                ></div>
              </div>
              <small className="text-muted ms-2">{formatDuration(duration * 1000)}</small>
            </div>
          </Col>

          {/* Volume & Options */}
          <Col md={3} className="text-end">
            <div className="d-flex justify-content-end align-items-center">
              <Button variant="link" className="text-muted me-2">
                🔊
              </Button>
              <div 
                className="bg-secondary position-relative"
                style={{ 
                  width: '80px', 
                  height: '4px', 
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
                onClick={handleVolumeChange}
              >
                <div 
                  className="bg-primary h-100"
                  style={{ 
                    width: `${volume * 100}%`, 
                    borderRadius: '2px',
                    transition: 'width 0.1s ease'
                  }}
                ></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MusicPlayer;