'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Tabs, Tab } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { SpotifyWebAPI, getImageUrl, formatDuration } from '@/lib/spotify-client';
import { useMusic } from '@/contexts/MusicContext';

interface SearchResults {
  tracks?: {
    items: any[];
  };
  artists?: {
    items: any[];
  };
  albums?: {
    items: any[];
  };
}

export default function SearchPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const { playTrack } = useMusic();

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!session) {
      window.location.href = '/api/auth/signin';
    }
  }, [session]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    try {
      if (!session?.accessToken) {
        throw new Error('No access token available');
      }

      const spotify = new SpotifyWebAPI(session.accessToken);
      const searchResults = await spotify.search(searchQuery, ['track', 'artist', 'album'], 20);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults({});
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayTrack = (track: any) => {
    playTrack({
      id: track.id,
      name: track.name,
      artists: track.artists,
      album: track.album,
      duration_ms: track.duration_ms,
      preview_url: track.preview_url,
    });
  };

  const renderTrack = (track: any, index: number) => {
    return (
      <div key={track.id} className="playlist-item fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
        <Row className="align-items-center">
          <Col md={1}>
            {track.album.images.length > 0 ? (
              <img
                src={getImageUrl(track.album.images, 'small')}
                alt={track.album.name}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div 
                className="text-center"
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
          </Col>
          <Col md={6}>
            <div className="fw-semibold">{track.name}</div>
            <div className="text-muted small">
              {track.artists.map((artist: any) => artist.name).join(', ')} • {track.album.name}
            </div>
          </Col>
          <Col md={2}>
            <span className="text-muted">{formatDuration(track.duration_ms)}</span>
          </Col>
          <Col md={3} className="text-end">
            <Button 
              variant="link" 
              className="text-muted me-2"
              onClick={() => handlePlayTrack(track)}
              disabled={!track.preview_url}
              title={track.preview_url ? 'Play preview' : 'No preview available'}
            >
              ▶️
            </Button>
            <Button variant="link" className="text-muted me-2">
              ❤️
            </Button>
            <Button variant="link" className="text-muted">
              ➕
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  const renderArtist = (artist: any, index: number) => {
    return (
      <div key={artist.id} className="playlist-item fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
        <Row className="align-items-center">
          <Col md={1}>
            {artist.images.length > 0 ? (
              <img
                src={getImageUrl(artist.images, 'small')}
                alt={artist.name}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div 
                className="text-center"
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'var(--primary-purple)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                👤
              </div>
            )}
          </Col>
          <Col md={6}>
            <div className="fw-semibold">{artist.name}</div>
            <div className="text-muted small">
              {artist.followers?.total ? `${artist.followers.total.toLocaleString()} followers` : 'Artist'}
            </div>
          </Col>
          <Col md={2}>
            {artist.genres?.length > 0 && (
              <span className="text-muted small">{artist.genres[0]}</span>
            )}
          </Col>
          <Col md={3} className="text-end">
            <Button variant="link" className="text-primary">
              View Artist
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  const renderAlbum = (album: any, index: number) => {
    return (
      <div key={album.id} className="playlist-item fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
        <Row className="align-items-center">
          <Col md={1}>
            {album.images.length > 0 ? (
              <img
                src={getImageUrl(album.images, 'small')}
                alt={album.name}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div 
                className="text-center"
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
                💿
              </div>
            )}
          </Col>
          <Col md={6}>
            <div className="fw-semibold">{album.name}</div>
            <div className="text-muted small">
              {album.artists.map((artist: any) => artist.name).join(', ')} • {new Date(album.release_date).getFullYear()}
            </div>
          </Col>
          <Col md={2}>
            <span className="text-muted small">{album.total_tracks} tracks</span>
          </Col>
          <Col md={3} className="text-end">
            <Button variant="link" className="text-primary">
              View Album
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  if (!session) {
    return null; // Will redirect in useEffect
  }

  const totalResults = (results.tracks?.items.length || 0) + 
                      (results.artists?.items.length || 0) + 
                      (results.albums?.items.length || 0);

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Search Music</h1>
          
          {/* Search Form */}
          <Form onSubmit={handleSearch} className="search-form mb-5">
            <Row>
              <Col md={10}>
                <Form.Control
                  type="text"
                  placeholder="Search for songs, artists, albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="lg"
                />
              </Col>
              <Col md={2}>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" />
                  ) : (
                    '🔍'
                  )}
                  Search
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Search Results */}
          {totalResults > 0 && (
            <>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || 'all')}
                className="mb-4"
                variant="pills"
              >
                <Tab eventKey="all" title={`All (${totalResults})`}>
                </Tab>
                <Tab eventKey="track" title={`Songs (${results.tracks?.items.length || 0})`}>
                </Tab>
                <Tab eventKey="artist" title={`Artists (${results.artists?.items.length || 0})`}>
                </Tab>
                <Tab eventKey="album" title={`Albums (${results.albums?.items.length || 0})`}>
                </Tab>
              </Tabs>

              <div>
                {(activeTab === 'all' || activeTab === 'track') && results.tracks?.items.map(renderTrack)}
                {(activeTab === 'all' || activeTab === 'artist') && results.artists?.items.map(renderArtist)}
                {(activeTab === 'all' || activeTab === 'album') && results.albums?.items.map(renderAlbum)}
              </div>
            </>
          )}

          {/* No Results */}
          {searchQuery && totalResults === 0 && !isLoading && (
            <div className="text-center py-5">
              <div className="mb-3" style={{ fontSize: '3rem', opacity: 0.5 }}>🔍</div>
              <h3 className="text-muted">No results found</h3>
              <p className="text-muted">Try searching with different keywords</p>
            </div>
          )}

          {/* Popular Searches */}
          {!searchQuery && (
            <div>
              <h3 className="mb-4">Popular Searches</h3>
              <Row>
                {['Pop Hits', 'Rock Classics', 'Hip Hop', 'Electronic', 'Indie', 'Jazz'].map((genre, index) => (
                  <Col lg={2} md={4} sm={6} className="mb-3" key={genre}>
                    <Card 
                      className="text-center h-100 cursor-pointer"
                      onClick={() => setSearchQuery(genre)}
                    >
                      <Card.Body>
                        <div className="mb-2" style={{ fontSize: '2rem' }}>🎵</div>
                        <Card.Title className="h6">{genre}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}