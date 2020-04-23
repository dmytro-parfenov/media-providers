import {DeezerAlbum} from './deezer-album';

export interface DeezerTrack {
  album: Pick<DeezerAlbum, 'id'>;
  link: string;
  preview: string;
  title: string;
}
