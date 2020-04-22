import {Injectable} from '@angular/core';
import {Media} from './shared/media/media';
import {MediaFactory} from './media-factory';
import {ServiceProvider} from '../shared/service-provider.enum';
import {DeezerFactory} from './factory/deezer/deezer-factory';
import {ItunesFactory} from './factory/itunes/itunes-factory';

@Injectable({
  providedIn: 'root'
})
export class MediaFactoryService {

  constructor() { }

  create(media: Media): MediaFactory {
    switch (media.type) {
      case ServiceProvider.iTunes:
        return new ItunesFactory();
      case ServiceProvider.Deezer:
        return new DeezerFactory();
    }

    throw new Error(`Media factory does not defined for ${media.type} provider`);
  }
}
