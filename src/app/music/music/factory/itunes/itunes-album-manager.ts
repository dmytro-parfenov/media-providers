import {MediaContextManager} from '../media-context-manager';
import {ItunesAlbum} from '../../../shared/api/itunes/itunes-album';
import {ItunesContext} from '../../shared/provider/itunes/itunes-context';

export class ItunesAlbumManager implements MediaContextManager<ItunesContext<ItunesAlbum>> {

  getName(context: ItunesContext<ItunesAlbum>) {
    return context.data.collectionName;
  }
}
