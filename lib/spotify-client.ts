import { getSession } from 'next-auth/react';

export class SpotifyWebAPI {
  private accessToken: string | null = null;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || null;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;
    
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No access token available');
    }
    
    return session.accessToken;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const token = await this.getAccessToken();
    
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json();
  }

  async getCurrentUser() {
    return this.makeRequest('/me');
  }

  async getUserPlaylists(limit = 50) {
    return this.makeRequest(`/me/playlists?limit=${limit}`);
  }

  async getPlaylist(playlistId: string) {
    return this.makeRequest(`/playlists/${playlistId}`);
  }

  async getPlaylistTracks(playlistId: string, limit = 50) {
    return this.makeRequest(`/playlists/${playlistId}/tracks?limit=${limit}`);
  }

  async search(query: string, type: string[] = ['track', 'artist', 'album'], limit = 20) {
    const types = type.join(',');
    const encodedQuery = encodeURIComponent(query);
    return this.makeRequest(`/search?q=${encodedQuery}&type=${types}&limit=${limit}`);
  }

  async getTrack(trackId: string) {
    return this.makeRequest(`/tracks/${trackId}`);
  }

  async getArtist(artistId: string) {
    return this.makeRequest(`/artists/${artistId}`);
  }

  async getAlbum(albumId: string) {
    return this.makeRequest(`/albums/${albumId}`);
  }

  async getFeaturedPlaylists(limit = 20) {
    return this.makeRequest(`/browse/featured-playlists?limit=${limit}`);
  }

  async getNewReleases(limit = 20) {
    return this.makeRequest(`/browse/new-releases?limit=${limit}`);
  }

  async getRecommendations(seedTracks?: string[], seedArtists?: string[], seedGenres?: string[], limit = 20) {
    const params = new URLSearchParams();
    if (seedTracks?.length) params.append('seed_tracks', seedTracks.join(','));
    if (seedArtists?.length) params.append('seed_artists', seedArtists.join(','));
    if (seedGenres?.length) params.append('seed_genres', seedGenres.join(','));
    params.append('limit', limit.toString());
    
    return this.makeRequest(`/recommendations?${params.toString()}`);
  }
}

export const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const getImageUrl = (images: any[], size: 'small' | 'medium' | 'large' = 'medium'): string => {
  if (!images || images.length === 0) return '';
  
  const sortedImages = images.sort((a, b) => b.width - a.width);
  
  switch (size) {
    case 'small':
      return sortedImages[sortedImages.length - 1]?.url || '';
    case 'large':
      return sortedImages[0]?.url || '';
    case 'medium':
    default:
      return sortedImages[Math.floor(sortedImages.length / 2)]?.url || sortedImages[0]?.url || '';
  }
};