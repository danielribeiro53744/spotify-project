'use client';

import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';

const userStats = {
  totalListenTime: '1,247 hours',
  topGenre: 'Pop',
  totalTracks: 2847,
  totalPlaylists: 12,
  followingArtists: 45,
  followingUsers: 23,
};

const topArtists = [
  { name: 'Taylor Swift', playTime: '127 hours', rank: 1 },
  { name: 'The Weeknd', playTime: '89 hours', rank: 2 },
  { name: 'Billie Eilish', playTime: '76 hours', rank: 3 },
  { name: 'Drake', playTime: '65 hours', rank: 4 },
  { name: 'Ariana Grande', playTime: '54 hours', rank: 5 },
];

const topTracks = [
  { name: 'Anti-Hero', artist: 'Taylor Swift', plays: 234 },
  { name: 'Blinding Lights', artist: 'The Weeknd', plays: 198 },
  { name: 'bad guy', artist: 'Billie Eilish', plays: 187 },
  { name: 'God\'s Plan', artist: 'Drake', plays: 156 },
  { name: '7 rings', artist: 'Ariana Grande', plays: 143 },
];

const listeningActivity = [
  { month: 'Jan', hours: 87 },
  { month: 'Feb', hours: 92 },
  { month: 'Mar', hours: 104 },
  { month: 'Apr', hours: 96 },
  { month: 'May', hours: 118 },
  { month: 'Jun', hours: 125 },
];

export default function ProfilePage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          {/* Profile Header */}
          <div className="text-center mb-5">
            <div 
              className="mx-auto mb-3"
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: 'var(--primary-purple)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
              }}
            >
              👤
            </div>
            <h1>Your Music Profile</h1>
            <p className="text-muted">
              Here's your personalized music journey and statistics
            </p>
          </div>

          {/* Stats Overview */}
          <Row className="mb-5">
            <Col lg={2} md={4} sm={6} className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <div className="mb-2" style={{ fontSize: '2rem' }}>⏱️</div>
                  <h4 className="text-primary mb-1">{userStats.totalListenTime}</h4>
                  <small className="text-muted">Total Listen Time</small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <div className="mb-2" style={{ fontSize: '2rem' }}>🎵</div>
                  <h4 className="text-primary mb-1">{userStats.totalTracks.toLocaleString()}</h4>
                  <small className="text-muted">Tracks Played</small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <div className="mb-2" style={{ fontSize: '2rem' }}>📝</div>
                  <h4 className="text-primary mb-1">{userStats.totalPlaylists}</h4>
                  <small className="text-muted">Playlists Created</small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <div className="mb-2" style={{ fontSize: '2rem' }}>🎤</div>
                  <h4 className="text-primary mb-1">{userStats.followingArtists}</h4>
                  <small className="text-muted">Artists Following</small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <div className="mb-2" style={{ fontSize: '2rem' }}>👥</div>
                  <h4 className="text-primary mb-1">{userStats.followingUsers}</h4>
                  <small className="text-muted">Friends</small>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-4">
              <Card className="text-center h-100">
                <Card.Body>
                  <div className="mb-2" style={{ fontSize: '2rem' }}>🎼</div>
                  <h4 className="text-primary mb-1">{userStats.topGenre}</h4>
                  <small className="text-muted">Top Genre</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* Top Artists */}
            <Col md={6} className="mb-5">
              <Card>
                <Card.Header>
                  <h4 className="mb-0">🎤 Your Top Artists</h4>
                  <small className="text-muted">Based on listening time</small>
                </Card.Header>
                <Card.Body className="p-0">
                  {topArtists.map((artist, index) => (
                    <div key={index} className="playlist-item border-0">
                      <Row className="align-items-center">
                        <Col md={1}>
                          <span className="fw-bold text-primary">#{artist.rank}</span>
                        </Col>
                        <Col md={1}>
                          <div 
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: 'var(--primary-purple)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            👤
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="fw-semibold">{artist.name}</div>
                          <div className="text-muted small">{artist.playTime} played</div>
                        </Col>
                        <Col md={4} className="text-end">
                          <Button variant="link" className="text-primary">
                            View Profile
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Top Tracks */}
            <Col md={6} className="mb-5">
              <Card>
                <Card.Header>
                  <h4 className="mb-0">🎵 Your Top Tracks</h4>
                  <small className="text-muted">Most played songs</small>
                </Card.Header>
                <Card.Body className="p-0">
                  {topTracks.map((track, index) => (
                    <div key={index} className="playlist-item border-0">
                      <Row className="align-items-center">
                        <Col md={1}>
                          <span className="fw-bold text-primary">#{index + 1}</span>
                        </Col>
                        <Col md={1}>
                          <div 
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: 'var(--primary-purple)',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            🎵
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="fw-semibold">{track.name}</div>
                          <div className="text-muted small">{track.artist}</div>
                        </Col>
                        <Col md={4} className="text-end">
                          <span className="text-muted small">{track.plays} plays</span>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Listening Activity */}
          <Row className="mb-5">
            <Col>
              <Card>
                <Card.Header>
                  <h4 className="mb-0">📊 Listening Activity</h4>
                  <small className="text-muted">Monthly listening hours</small>
                </Card.Header>
                <Card.Body>
                  {listeningActivity.map((month, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>{month.month}</span>
                        <span className="text-muted">{month.hours}h</span>
                      </div>
                      <ProgressBar 
                        now={month.hours} 
                        max={150} 
                        variant="primary"
                        style={{ height: '8px' }}
                      />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Actions */}
          <Row>
            <Col className="text-center">
              <Button variant="primary" size="lg" className="me-3">
                📊 Get Full Report
              </Button>
              <Button variant="outline-primary" size="lg">
                📤 Share Stats
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}