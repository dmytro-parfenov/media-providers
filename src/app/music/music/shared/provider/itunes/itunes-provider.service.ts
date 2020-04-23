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
import {ProviderQueryType} from '../provider-query-type.enum';
import {ItunesAttributeType} from '../../../../shared/api/itunes/itunes-attribute-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService extends Provider<ItunesContext> {

  type = ServiceProviderType.iTunes;

  entities = [ProviderContextType.Album, ProviderContextType.Track];

  queryTypes = [ProviderQueryType.Artist];

  constructor(private readonly itunesDataService: ItunesDataService) {
    super();
  }

  search({query, entity, queryType}: SearchParams) {
    entity = entity ? entity : this.defaultEntity;
    queryType = queryType ? queryType : this.defaultQueryType;

    const entityValue = this.resolveEntity(entity);
    const queryTypeValue = this.resolveAttribute(queryType);

    if (!query || !entityValue || !queryTypeValue) {
      return of<ItunesContext[]>([]);
    }

    return this.itunesDataService.search(query, entityValue, queryTypeValue).pipe(
      map<ItunesResult, ItunesContext[]>(response =>
        response.results.map<ItunesContext>(data => ({type: entityValue, data}))),
      catchError(error => {
        console.error(`Unable to load data using iTunes provider`);
        return throwError(error);
      }),
    );
  }

  private resolveAttribute(queryType: ProviderQueryType) {
    switch (queryType) {
      case ProviderQueryType.Artist:
        return ItunesAttributeType.Artist;
    }

    return null;
  }

  private resolveEntity(entity: ProviderContextType) {
    switch (entity) {
      case ProviderContextType.Track:
        return ItunesMusicEntityType.Song;
      case ProviderContextType.Album:
        return ItunesMusicEntityType.Album;
    }

    return null;
  }
}
