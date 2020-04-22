import {ItunesContext} from '../../shared/provider/itunes/itunes-context';
import {MediaFactory} from '../../media-factory';
import {ProviderContextType} from '../../shared/provider/provider-context-type.enum';
import {ItunesAlbumManager} from './itunes-album-manager';

export class ItunesFactory implements MediaFactory<ItunesContext> {
  create(context: ItunesContext) {
    switch (context.type) {
      case ProviderContextType.Album:
        return new ItunesAlbumManager();
    }

    throw new Error(`Media context manager does not defined for ${context.type} of Itunes provider`);
  }
}

