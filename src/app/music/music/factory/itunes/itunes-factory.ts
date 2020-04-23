import {ItunesContext} from '../../shared/provider/itunes/itunes-context';
import {MediaFactory} from '../../media-factory';
import {ItunesAlbumManager} from './itunes-album-manager';
import {ItunesMusicEntityType} from '../../../shared/api/itunes/itunes-music-entity-type.enum';

export class ItunesFactory implements MediaFactory<ItunesContext> {
  create(context: ItunesContext) {
    switch (context.type) {
      case ItunesMusicEntityType.Album:
        return new ItunesAlbumManager();
    }

    throw new Error(`Media context manager does not defined for ${context.type} of Itunes provider`);
  }
}

