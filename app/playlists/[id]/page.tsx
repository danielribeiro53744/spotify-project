'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SpotifyWebAPI, getImageUrl, formatDuration } from '@/lib/spotify-client';
import { useMusic } from '@/contexts/MusicContext';

interface PlaylistTrack {
  track: {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; width: number; height: number }>;
    };
    duration_ms: number;
    preview_url?: string;
  };
}

interface PlaylistDetails {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string; width: number; height: number }>;
  tracks: {
    total: number;
    items: PlaylistTrack[];
  };
  owner: {
    display_name: string;
  };
}

export default function PlaylistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState<PlaylistDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { playTrack } = useMusic();

  useEffect(() => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    const fetchPlaylist = async () => {
      try {
        const spotify = new SpotifyWebAPI(session.accessToken);
        const playlistData = await spotify.getPlaylist(params.id as string);
        setPlaylist(playlistData);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [session, params.id, router]);

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

  if (!session) {
    return null;
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading playlist...</p>
        </div>
      </Container>
    );
  }

  if (!playlist) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Playlist not found</h2>
          <Button onClick={() => router.back()} variant="primary">
            Go Back
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Playlist Header */}
      <Row className="mb-5">
        <Col>
          <div className="d-flex align-items-center mb-4">
            <Button 
              variant="link" 
              className="text-muted me-3 p-0"
              onClick={() => router.back()}
            >
              ← Back
            </Button>
          </div>
          
          <div className="d-flex align-items-start">
            {playlist.images.length > 0 ? (
              <img
                src={getImageUrl(playlist.images, 'large')}
                alt={playlist.name}
                className="me-4"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div 
                className="me-4"
                style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'var(--primary-purple)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                }}
              >
                📝
              </div>
            )}
            
            <div className="flex-grow-1">
              <h1 className="mb-2">{playlist.name}</h1>
              {playlist.description && (
                <p className="text-muted mb-3">{playlist.description}</p>
              )}
              <div className="d-flex align-items-center text-muted mb-4">
                <span>By {playlist.owner.display_name}</span>
                <span className="mx-2">•</span>
                <span>{playlist.tracks.total} tracks</span>
              </div>
              
              <div className="d-flex gap-3">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => {
                    const firstTrackWithPreview = playlist.tracks.items.find(
                      item => item.track.preview_url
                    );
                    if (firstTrackWithPreview) {
                      handlePlayTrack(firstTrackWithPreview.track);
                    }
                  }}
                >
                  ▶️ Play
                </Button>
                <Button variant="outline-primary" size="lg">
                  ❤️ Like
                </Button>
                <Button variant="outline-secondary" size="lg">
                  📤 Share
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Track List */}
      <Row>
        <Col>
          <div className="mb-3">
            <Row className="text-muted small fw-semibold border-bottom pb-2">
              <Col md={1}>#</Col>
              <Col md={5}>Title</Col>
              <Col md={3}>Album</Col>
              <Col md={2}>Duration</Col>
              <Col md={1}></Col>
            </Row>
          </div>
          
          {playlist.tracks.items.map((item, index) => {
            const track = item.track;
            return (
              <div 
                key={track.id} 
                className="playlist-item fade-in-up border-0"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <Row className="align-items-center">
                  <Col md={1}>
                    <span className="text-muted">{index + 1}</span>
                  </Col>
                  <Col md={5}>
                    <div className="d-flex align-items-center">
                      {track.album.images.length > 0 ? (
                        <img
                          src={getImageUrl(track.album.images, 'small')}
                          alt={track.album.name}
                          className="me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '4px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div 
                          className="me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'var(--primary-purple)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                          }}
                        >
                          🎵
                        </div>
                      )}
                      <div>
                        <div className="fw-semibold">{track.name}</div>
                        <div className="text-muted small">
                          {track.artists.map(artist => artist.name).join(', ')}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={3}>
                    <span className="text-muted small">{track.album.name}</span>
                  </Col>
                  <Col md={2}>
                    <span className="text-muted small">{formatDuration(track.duration_ms)}</span>
                  </Col>
                  <Col md={1} className="text-end">
                    <Button 
                      variant="link" 
                      className="text-muted p-1"
                      onClick={() => handlePlayTrack(track)}
                      disabled={!track.preview_url}
                      title={track.preview_url ? 'Play preview' : 'No preview available'}
                    >
                      ▶️
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          })}
          
          {playlist.tracks.items.length === 0 && (
            <div className="text-center py-5">
              <div className="mb-3" style={{ fontSize: '3rem', opacity: 0.5 }}>🎵</div>
              <h4 className="text-muted">This playlist is empty</h4>
              <p className="text-muted">Add some tracks to get started</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}