import {ItunesContext} from '../../shared/provider/itunes/itunes-context';
import {MediaFactory} from '../../media-factory';
import {ItunesAlbumManager} from './itunes-album-manager';
import {ItunesContextType} from '../../shared/provider/itunes/itunes-context-type.enum';

export class ItunesFactory implements MediaFactory<ItunesContext> {
  create(context: ItunesContext) {
    switch (context.type) {
      case ItunesContextType.Album:
        return new ItunesAlbumManager();
    }

    throw new Error(`Media context manager does not defined for ${context.type} of Itunes provider`);
  }
}

