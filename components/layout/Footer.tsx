import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h5 className="mb-3" style={{ color: 'var(--primary-purple)' }}>
              🎵 MusicFlow
            </h5>
            <p className="text-muted">
              Your personal music experience. Discover, create, and enjoy music like never before.
            </p>
          </Col>
          
          <Col lg={2} md={3} className="mb-4 mb-lg-0">
            <h6 className="mb-3">Features</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Search Music</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Create Playlists</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Discover</a></li>
            </ul>
          </Col>
          
          <Col lg={2} md={3} className="mb-4 mb-lg-0">
            <h6 className="mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Privacy</a></li>
            </ul>
          </Col>
          
          <Col lg={4} md={12}>
            <h6 className="mb-3">Connect</h6>
            <p className="text-muted">
              Follow us for the latest updates and music recommendations.
            </p>
            <div className="d-flex">
              <a href="#" className="text-muted me-3">Twitter</a>
              <a href="#" className="text-muted me-3">Instagram</a>
              <a href="#" className="text-muted">Spotify</a>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />
        
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              © 2025 MusicFlow. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;