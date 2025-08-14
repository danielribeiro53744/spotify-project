'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const genres = [
  { name: 'Pop', emoji: '🎤', color: '#FF6B6B', description: 'Chart-topping hits and mainstream favorites' },
  { name: 'Rock', emoji: '🎸', color: '#4ECDC4', description: 'Classic and modern rock anthems' },
  { name: 'Hip Hop', emoji: '🎤', color: '#45B7D1', description: 'Rap, beats, and urban culture' },
  { name: 'Electronic', emoji: '🎛️', color: '#96CEB4', description: 'EDM, house, and electronic beats' },
  { name: 'Jazz', emoji: '🎺', color: '#FFEAA7', description: 'Smooth jazz and improvisational music' },
  { name: 'Classical', emoji: '🎼', color: '#DDA0DD', description: 'Orchestral and classical compositions' },
  { name: 'R&B', emoji: '💫', color: '#FFB347', description: 'Soul, rhythm and blues' },
  { name: 'Country', emoji: '🤠', color: '#98D8C8', description: 'Country, folk, and Americana' },
];

const featuredArtists = [
  { name: 'Taylor Swift', genre: 'Pop', monthlyListeners: '80M' },
  { name: 'The Weeknd', genre: 'R&B', monthlyListeners: '75M' },
  { name: 'Drake', genre: 'Hip Hop', monthlyListeners: '85M' },
  { name: 'Billie Eilish', genre: 'Pop', monthlyListeners: '65M' },
];

const trending = [
  { name: 'Flowers', artist: 'Miley Cyrus', trend: '+15%' },
  { name: 'Anti-Hero', artist: 'Taylor Swift', trend: '+12%' },
  { name: 'As It Was', artist: 'Harry Styles', trend: '+8%' },
  { name: 'Unholy', artist: 'Sam Smith ft. Kim Petras', trend: '+20%' },
];

export default function DiscoverPage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-5">Discover New Music</h1>

          {/* Genres Section */}
          <section className="mb-5">
            <h2 className="mb-4">Browse by Genre</h2>
            <Row>
              {genres.map((genre, index) => (
                <Col lg={3} md={4} sm={6} className="mb-4" key={genre.name}>
                  <Card 
                    className="h-100 text-center cursor-pointer fade-in-up"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      background: `linear-gradient(135deg, ${genre.color}20, ${genre.color}10)`,
                      borderColor: genre.color + '40',
                    }}
                  >
                    <Card.Body className="d-flex flex-column">
                      <div className="mb-3" style={{ fontSize: '3rem' }}>
                        {genre.emoji}
                      </div>
                      <Card.Title style={{ color: genre.color }}>
                        {genre.name}
                      </Card.Title>
                      <Card.Text className="flex-grow-1 small">
                        {genre.description}
                      </Card.Text>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        style={{ 
                          borderColor: genre.color, 
                          color: genre.color 
                        }}
                      >
                        Explore
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* Trending Section */}
          <section className="mb-5">
            <h2 className="mb-4">🔥 Trending Now</h2>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Hot Tracks</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {trending.map((track, index) => (
                      <div key={index} className="playlist-item border-0">
                        <Row className="align-items-center">
                          <Col md={1}>
                            <span className="fw-bold text-primary">#{index + 1}</span>
                          </Col>
                          <Col md={6}>
                            <div className="fw-semibold">{track.name}</div>
                            <div className="text-muted small">{track.artist}</div>
                          </Col>
                          <Col md={3}>
                            <span 
                              className="badge"
                              style={{ 
                                backgroundColor: 'var(--primary-purple)',
                                color: 'white' 
                              }}
                            >
                              {track.trend}
                            </span>
                          </Col>
                          <Col md={2} className="text-end">
                            <Button variant="link" className="text-muted">
                              ▶️
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Featured Artists</h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {featuredArtists.map((artist, index) => (
                      <div key={index} className="playlist-item border-0">
                        <Row className="align-items-center">
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
                            <div className="text-muted small">{artist.genre}</div>
                          </Col>
                          <Col md={3}>
                            <div className="text-muted small">
                              {artist.monthlyListeners} listeners
                            </div>
                          </Col>
                          <Col md={2} className="text-end">
                            <Button variant="link" className="text-primary">
                              Follow
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>

          {/* Personalized Recommendations */}
          <section className="mb-5">
            <h2 className="mb-4">✨ Made For You</h2>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>🎯</div>
                    <Card.Title>Discover Weekly</Card.Title>
                    <Card.Text>
                      Fresh music picks based on your listening history
                    </Card.Text>
                    <Button variant="primary">Listen Now</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>📻</div>
                    <Card.Title>Release Radar</Card.Title>
                    <Card.Text>
                      New releases from artists you follow
                    </Card.Text>
                    <Button variant="primary">Check Updates</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>🌟</div>
                    <Card.Title>Daily Mix</Card.Title>
                    <Card.Text>
                      A mix of your favorites and new discoveries
                    </Card.Text>
                    <Button variant="primary">Start Mixing</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
        </Col>
      </Row>
    </Container>
  );
}