import {Injectable} from '@angular/core';
import {Media} from './shared/media/media';
import {SearchParams} from './search-params';
import {orderBy, uniqBy} from 'lodash-es';
import {MediaFactoryService} from './media-factory.service';
import {ProviderSortingType} from './shared/provider/provider-sorting-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MediasUtilsService {

  constructor(private readonly mediaFactoryService: MediaFactoryService) { }

  applySearchParams(medias: Media[], params: SearchParams) {
    if (params.sortBy) {
      medias = this.applySorting(medias, params.sortBy);
    }

    if (params.uniq) {
      medias = uniqBy(medias, this.getName.bind(this));
    }

    return medias;
  }

  private applySorting(medias: Media[], sortBy: ProviderSortingType) {
    switch (sortBy) {
      case ProviderSortingType.NameAsc:
        return orderBy(medias, this.getName.bind(this), 'asc');
      case ProviderSortingType.NameDesc:
        return orderBy(medias, this.getName.bind(this), 'desc');
      case ProviderSortingType.ProviderAsc:
        return orderBy(medias, media => media.type, 'asc');
      case ProviderSortingType.ProviderDesc:
        return orderBy(medias, media => media.type, 'desc');
    }

    return medias;
  }

  private getName(media: Media) {
    const mediaFactory = this.mediaFactoryService.create(media);
    const mediaContextManager = mediaFactory.create(media.context);

    return mediaContextManager.getName(media.context);
  }
}
