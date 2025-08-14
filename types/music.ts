export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
  preview_url?: string;
  spotify_id?: string;
  popularity?: number;
  explicit?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity?: number;
  followers?: number;
  spotify_id?: string;
  image_url?: string;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  release_date: string;
  total_tracks: number;
  spotify_id?: string;
  image_url?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  created_at: string;
  updated_at: string;
  is_public: boolean;
  owner_id: string;
}

export interface SpotifySearchResponse {
  tracks?: {
    items: SpotifyTrack[];
    total: number;
  };
  artists?: {
    items: SpotifyArtist[];
    total: number;
  };
  albums?: {
    items: SpotifyAlbum[];
    total: number;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  preview_url?: string;
  popularity: number;
  explicit: boolean;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity?: number;
  followers?: {
    total: number;
  };
  images?: SpotifyImage[];
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  release_date: string;
  total_tracks: number;
  images?: SpotifyImage[];
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}