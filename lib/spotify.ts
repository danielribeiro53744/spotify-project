// Spotify Web API integration utilities
// Note: This will require proper authentication setup

export class SpotifyAPI {
  private static instance: SpotifyAPI;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): SpotifyAPI {
    if (!SpotifyAPI.instance) {
      SpotifyAPI.instance = new SpotifyAPI();
    }
    return SpotifyAPI.instance;
  }

  // Initialize Spotify API with client credentials
  async initialize(clientId: string, clientSecret: string): Promise<void> {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate with Spotify');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
    } catch (error) {
      console.error('Spotify initialization failed:', error);
      throw error;
    }
  }

  // Search for tracks, artists, or albums
  async search(query: string, type: 'track' | 'artist' | 'album' | 'all' = 'all', limit: number = 20) {
    if (!this.accessToken) {
      throw new Error('Spotify API not initialized');
    }

    const searchType = type === 'all' ? 'track,artist,album' : type;
    
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${searchType}&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Spotify search failed:', error);
      throw error;
    }
  }

  // Get track details by ID
  async getTrack(trackId: string) {
    if (!this.accessToken) {
      throw new Error('Spotify API not initialized');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get track details');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get track:', error);
      throw error;
    }
  }

  // Get artist details by ID
  async getArtist(artistId: string) {
    if (!this.accessToken) {
      throw new Error('Spotify API not initialized');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get artist details');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get artist:', error);
      throw error;
    }
  }

  // Get album details by ID
  async getAlbum(albumId: string) {
    if (!this.accessToken) {
      throw new Error('Spotify API not initialized');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get album details');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get album:', error);
      throw error;
    }
  }

  // Get featured playlists
  async getFeaturedPlaylists(limit: number = 20) {
    if (!this.accessToken) {
      throw new Error('Spotify API not initialized');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get featured playlists');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get featured playlists:', error);
      throw error;
    }
  }

  // Get new releases
  async getNewReleases(limit: number = 20) {
    if (!this.accessToken) {
      throw new Error('Spotify API not initialized');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get new releases');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get new releases:', error);
      throw error;
    }
  }
}

// Utility function to format duration from milliseconds to MM:SS
export function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Utility function to get image URL from Spotify image array
export function getImageUrl(images: any[], preferredSize: 'small' | 'medium' | 'large' = 'medium'): string {
  if (!images || images.length === 0) return '';
  
  // Sort by size (largest first)
  const sortedImages = images.sort((a, b) => b.width - a.width);
  
  switch (preferredSize) {
    case 'small':
      return sortedImages[sortedImages.length - 1]?.url || '';
    case 'large':
      return sortedImages[0]?.url || '';
    case 'medium':
    default:
      return sortedImages[Math.floor(sortedImages.length / 2)]?.url || sortedImages[0]?.url || '';
  }
}