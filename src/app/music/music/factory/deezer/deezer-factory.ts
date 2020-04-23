import {MediaFactory} from '../../media-factory';
import {DeezerContext} from '../../shared/provider/deezer/deezer-context';
import {DeezerAlbumManager} from './deezer-album-manager';
import {DeezerEntityType} from '../../../shared/api/deezer/deezer-entity-type.enum';

export class DeezerFactory implements MediaFactory<DeezerContext> {
  create(context: DeezerContext) {
    switch (context.type) {
      case DeezerEntityType.Album:
        return new DeezerAlbumManager();
    }

    throw new Error(`Media context manager does not defined for ${context.type} of Deezer provider`);
  }
}
