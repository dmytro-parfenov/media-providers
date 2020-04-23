import {Injectable} from '@angular/core';
import {ItunesDataService} from '../../../../shared/api/itunes-data.service';
import {Provider} from '../provider';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {ItunesResult} from '../../../../shared/api/itunes/itunes-result';
import {SearchParams} from '../../../search-params';
import {ItunesContext} from './itunes-context';
import {ProviderContextType} from '../provider-context-type.enum';
import {ServiceProviderType} from '../../../../shared/service-provider-type.enum';
import {ItunesMusicEntityType} from '../../../../shared/api/itunes/itunes-music-entity-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService extends Provider<ItunesContext> {

  type = ServiceProviderType.iTunes;

  entities = [ProviderContextType.Album, ProviderContextType.Track];

  constructor(private readonly itunesDataService: ItunesDataService) {
    super();
  }

  search({query, entity}: SearchParams) {
    const musicEntityType = this.resolveEntity(entity);

    if (!query || !musicEntityType) {
      return of<ItunesContext[]>([]);
    }

    return this.itunesDataService.search(query, musicEntityType).pipe(
      map<ItunesResult, ItunesContext[]>(response =>
        response.results.map<ItunesContext>(data => ({type: musicEntityType, data}))),
      catchError(error => {
        console.error(`Unable to load data using iTunes provider`);
        return throwError(error);
      }),
    );
  }

  private resolveEntity(entity: ProviderContextType) {
    switch (entity) {
      case ProviderContextType.Track:
        return ItunesMusicEntityType.MusicTrack;
      case ProviderContextType.Album:
      case null:
        return ItunesMusicEntityType.Album;
    }

    return null;
  }
}
