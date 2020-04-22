import {MediaFactory} from '../../media-factory';
import {DeezerContext} from '../../shared/provider/deezer/deezer-context';
import {ProviderContextType} from '../../shared/provider/provider-context-type.enum';
import {DeezerAlbumManager} from './deezer-album-manager';

export class DeezerFactory implements MediaFactory<DeezerContext> {
  create(context: DeezerContext) {
    switch (context.type) {
      case ProviderContextType.Album:
        return new DeezerAlbumManager();
    }

    throw new Error(`Media context manager does not defined for ${context.type} of Deezer provider`);
  }
}
