import {DeezerArtist} from './deezer-artist';

export interface DeezerAlbum {
  title: string;
  cover_medium: string;
  nb_tracks: number;
  link: string;
  artist: DeezerArtist;
}
