'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SpotifyWebAPI, getImageUrl } from '@/lib/spotify-client';

interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: { total: number };
  images: Array<{ url: string; width: number; height: number }>;
}

export default function Home() {
  const { data: session } = useSession();
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const spotify = new SpotifyWebAPI(session.accessToken);
        
        // Fetch featured playlists and user playlists in parallel
        const [featuredResponse, userPlaylistsResponse] = await Promise.all([
          spotify.getFeaturedPlaylists(6),
          spotify.getUserPlaylists(6)
        ]);

        setFeaturedPlaylists(featuredResponse.playlists?.items || []);
        setUserPlaylists(userPlaylistsResponse.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (!session) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="hero-section fade-in-up">
            <h1 className="hero-title">Welcome to MusicFlow</h1>
            <p className="hero-subtitle">
              Connect your Spotify account to discover new music, create playlists, and enjoy your favorite songs
            </p>
            <Button href="/api/auth/signin" variant="primary" size="lg">
              Sign In with Spotify
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your music...</p>
        </div>
      </Container>
    );
  }
  return (
    <>
      {/* Hero Section */}
      <Container className="my-5">
        <div className="hero-section fade-in-up">
          <h1 className="hero-title">Welcome back, {session.user?.name}!</h1>
          <p className="hero-subtitle">
            Ready to discover new music and enjoy your favorite songs?
          </p>
          <div>
            <Button href="/search" variant="primary" size="lg" className="me-3">
              Start Exploring
            </Button>
            <Button href="/playlists" variant="outline-primary" size="lg">
              My Playlists
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        {/* User Playlists */}
        {userPlaylists.length > 0 && (
          <Row className="mb-5">
            <Col>
              <h2 className="mb-4">Your Playlists</h2>
              <Row>
                {userPlaylists.map((playlist, index) => (
                  <Col lg={4} md={6} className="mb-4" key={playlist.id}>
                    <Card className="h-100 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <Card.Body className="text-center">
                        {playlist.images.length > 0 ? (
                          <img
                            src={getImageUrl(playlist.images, 'medium')}
                            alt={playlist.name}
                            className="mb-3"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '12px',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div 
                            className="mb-3 mx-auto"
                            style={{ 
                              width: '120px',
                              height: '120px',
                              backgroundColor: 'var(--primary-purple)',
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '3rem'
                            }}
                          >
                            📝
                          </div>
                        )}
                        <Card.Title>{playlist.name}</Card.Title>
                        <Card.Text>{playlist.description || 'No description'}</Card.Text>
                        <Card.Text>
                          <small className="text-muted">{playlist.tracks.total} tracks</small>
                        </Card.Text>
                        <Button  href={`/playlists/${playlist.id}`} variant="primary">
                          View Playlist
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        {/* Featured Playlists */}
        {featuredPlaylists.length > 0 && (
          <Row className="mb-5">
            <Col>
              <h2 className="mb-4">Featured Playlists</h2>
              <Row>
                {featuredPlaylists.map((playlist, index) => (
                  <Col lg={4} md={6} className="mb-4" key={playlist.id}>
                    <Card className="h-100 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <Card.Body className="text-center">
                        {playlist.images.length > 0 ? (
                          <img
                            src={getImageUrl(playlist.images, 'medium')}
                            alt={playlist.name}
                            className="mb-3"
                            style={{
                              width: '120px',
                              height: '120px',
                              borderRadius: '12px',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div 
                            className="mb-3 mx-auto"
                            style={{ 
                              width: '120px',
                              height: '120px',
                              backgroundColor: 'var(--primary-purple)',
                              borderRadius: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '3rem'
                            }}
                          >
                            🎵
                          </div>
                        )}
                        <Card.Title>{playlist.name}</Card.Title>
                        <Card.Text>{playlist.description || 'No description'}</Card.Text>
                        <Card.Text>
                          <small className="text-muted">{playlist.tracks.total} tracks</small>
                        </Card.Text>
                        <Button href={`/playlists/${playlist.id}`} variant="primary">
                          View Playlist
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        {/* Quick Actions */}
        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Quick Actions</h2>
            <Row>
              <Col md={3} className="mb-3">
                <Card className="text-center h-100">
                  <Card.Body>
                    <div className="mb-3" style={{ fontSize: '2rem' }}>🔍</div>
                    <Card.Title>Search Music</Card.Title>
                    <Card.Text>Find songs, artists, and albums</Card.Text>
                    <Button href="/search" variant="outline-primary">
                      Search
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className="text-center h-100">
                  <Card.Body>
                    <div className="mb-3" style={{ fontSize: '2rem' }}>📝</div>
                    <Card.Title>Create Playlist</Card.Title>
                    <Card.Text>Build your perfect playlist</Card.Text>
                    <Button  href="/playlists" variant="outline-primary">
                      Create
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className="text-center h-100">
                  <Card.Body>
                    <div className="mb-3" style={{ fontSize: '2rem' }}>🎲</div>
                    <Card.Title>Discover</Card.Title>
                    <Card.Text>Find new music you'll love</Card.Text>
                    <Button href="/discover" variant="outline-primary">
                      Discover
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-3">
                <Card className="text-center h-100">
                  <Card.Body>
                    <div className="mb-3" style={{ fontSize: '2rem' }}>📊</div>
                    <Card.Title>Your Stats</Card.Title>
                    <Card.Text>See your listening habits</Card.Text>
                    <Button href="/profile" variant="outline-primary">
                      View Stats
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}