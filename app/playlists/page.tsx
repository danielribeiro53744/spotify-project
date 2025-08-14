'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SpotifyWebAPI, getImageUrl } from '@/lib/spotify-client';

interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: { total: number };
  images: Array<{ url: string; width: number; height: number }>;
  owner: { display_name: string };
  public: boolean;
}

export default function PlaylistsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    public: false,
  });

  useEffect(() => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    const fetchPlaylists = async () => {
      try {
        const spotify = new SpotifyWebAPI(session.accessToken);
        const response = await spotify.getUserPlaylists(50);
        setPlaylists(response.items || []);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [session, router]);

  const handleCreatePlaylist = () => {
    if (!newPlaylist.name.trim()) return;

    // TODO: Implement playlist creation via Spotify API
    console.log('Creating playlist:', newPlaylist);
    setNewPlaylist({ name: '', description: '', public: false });
    setShowCreateModal(false);
  };

  if (!session) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your playlists...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h1>My Playlists</h1>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Create Playlist
            </Button>
          </div>

          {/* Playlists Grid */}
          <Row>
            {playlists.map((playlist, index) => (
              <Col lg={4} md={6} className="mb-4" key={playlist.id}>
                <Card className="h-100 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      {playlist.images.length > 0 ? (
                        <img
                          src={getImageUrl(playlist.images, 'medium')}
                          alt={playlist.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div 
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'var(--primary-purple)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                          }}
                        >
                          📝
                        </div>
                      )}
                      <div className="text-end">
                        {playlist.public ? (
                          <span className="badge bg-success">Public</span>
                        ) : (
                          <span className="badge bg-secondary">Private</span>
                        )}
                      </div>
                    </div>
                    
                    <Card.Title className="mb-2">{playlist.name}</Card.Title>
                    <Card.Text className="text-muted mb-3">
                      {playlist.description || 'No description'}
                    </Card.Text>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between text-muted small">
                        <span>{playlist.tracks.total} tracks</span>
                      </div>
                      <div className="text-muted small">
                        By {playlist.owner.display_name}
                      </div>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button href={`/playlists/${playlist.id}`} variant="primary">
                        ▶️ Play
                      </Button>
                      <div className="btn-group">
                        <Button variant="outline-secondary" size="sm">
                          ✏️ Edit
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          📤 Share
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          🗑️
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Empty State */}
          {playlists.length === 0 && (
            <div className="text-center py-5">
              <div className="mb-4" style={{ fontSize: '4rem', opacity: 0.5 }}>📝</div>
              <h3 className="text-muted mb-3">No playlists yet</h3>
              <p className="text-muted mb-4">
                Create your first playlist to organize your favorite music
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setShowCreateModal(true)}
              >
                ➕ Create Your First Playlist
              </Button>
            </div>
          )}
        </Col>
      </Row>

      {/* Create Playlist Modal */}
      <Modal 
        show={showCreateModal} 
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton className="border-bottom" style={{ backgroundColor: 'var(--card-bg)' }}>
          <Modal.Title>Create New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'var(--card-bg)' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter playlist name..."
                value={newPlaylist.name}
                onChange={(e) => setNewPlaylist({...newPlaylist, name: e.target.value})}
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a description..."
                value={newPlaylist.description}
                onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Make this playlist public"
                checked={newPlaylist.public}
                onChange={(e) => setNewPlaylist({...newPlaylist, public: e.target.checked})}
              />
              <Form.Text className="text-muted">
                Public playlists can be discovered by other users
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'var(--card-bg)' }} className="border-top">
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCreatePlaylist}
            disabled={!newPlaylist.name.trim()}
          >
            Create Playlist
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}