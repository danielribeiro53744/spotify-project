'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { signIn, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/');
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="text-center">
            <Card.Body className="p-5">
              <div className="mb-4" style={{ fontSize: '4rem' }}>🎵</div>
              <h2 className="mb-3">Welcome to MusicFlow</h2>
              <p className="text-muted mb-4">
                Connect your Spotify account to access your music, create playlists, and discover new songs.
              </p>
              
              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-3"
                onClick={() => signIn('spotify', { callbackUrl: '/' })}
              >
                <span className="me-2">🎧</span>
                Continue with Spotify
              </Button>
              
              <div className="text-muted small">
                <p className="mb-2">By signing in, you agree to our terms of service.</p>
                <p className="mb-0">We'll only access your public profile and playlists.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}