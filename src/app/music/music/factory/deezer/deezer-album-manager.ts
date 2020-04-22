import {MediaContextManager} from '../media-context-manager';
import {DeezerAlbum} from '../../../shared/api/deezer/deezer-album';
import {DeezerContext} from '../../shared/provider/deezer/deezer-context';

export class DeezerAlbumManager implements MediaContextManager<DeezerContext<DeezerAlbum>> {

  getName(context: DeezerContext<DeezerAlbum>) {
    return context.data.title;
  }
}
