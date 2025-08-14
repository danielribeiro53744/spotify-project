'use client';

import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from 'react-bootstrap';

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (path: string) => {
    return pathname === path ? 'active' : '';
  };

  return (
    <Navbar expand="lg" className="navbar-dark sticky-top">
      <Container>
        <Navbar.Brand as={Link} href="/">
          🎵 MusicFlow
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" className={isActive('/')}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/search" className={isActive('/search')}>
              Search
            </Nav.Link>
            <Nav.Link as={Link} href="/playlists" className={isActive('/playlists')}>
              My Playlists
            </Nav.Link>
            <Nav.Link as={Link} href="/discover" className={isActive('/discover')}>
              Discover
            </Nav.Link>
          </Nav>
          
          <Nav>
            {status === 'loading' ? (
              <Nav.Link disabled>Loading...</Nav.Link>
            ) : session ? (
              <>
                <Nav.Link as={Link} href="/profile" className={isActive('/profile')}>
                  {session.user?.name || 'Profile'}
                </Nav.Link>
                <Nav.Link onClick={() => signOut()} style={{ cursor: 'pointer' }}>
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => signIn('spotify')} style={{ cursor: 'pointer' }}>
                Sign In with Spotify
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;