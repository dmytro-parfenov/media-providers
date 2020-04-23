import {DeezerArtist} from './deezer-artist';

export interface DeezerAlbum {
  id: number;
  title: string;
  cover_medium: string;
  nb_tracks: number;
  link: string;
  artist: Pick<DeezerArtist, 'link' | 'name' | 'picture_medium'>;
}
