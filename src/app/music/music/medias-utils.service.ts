import {Injectable} from '@angular/core';
import {Media} from './shared/media/media';
import {SearchParams} from './search-params';
import {uniqBy} from 'lodash-es';
import {MediaFactoryService} from './media-factory.service';

@Injectable({
  providedIn: 'root'
})
export class MediasUtilsService {

  constructor(private readonly mediaFactoryService: MediaFactoryService) { }

  applySearchParams(medias: Media[], params: SearchParams) {
    if (!params.uniq) {
      return medias;
    }

    return uniqBy(medias, media => {
      const mediaFactory = this.mediaFactoryService.create(media);
      const mediaContextManager = mediaFactory.create(media.context);

      return mediaContextManager.getName(media.context);
    });
  }
}
