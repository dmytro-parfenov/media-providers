import {DeezerTrack} from '../../../../../../../shared/api/deezer/deezer-track';

export interface DeezerAlbumTracksData {
  cover: string;
  title: string;
  artist: string;
  tracks: DeezerTrack[];
}
