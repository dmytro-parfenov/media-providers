import {Injectable} from '@angular/core';
import {DeezerDataService} from '../../../../shared/api/deezer-data.service';
import {Provider} from '../provider';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {DeezerResult} from '../../../../shared/api/deezer/deezer-result';
import {SearchParams} from '../../../search-params';
import {DeezerContext} from './deezer-context';
import {ProviderContextType} from '../provider-context-type.enum';
import {ServiceProviderType} from '../../../../shared/service-provider-type.enum';
import {DeezerEntityType} from '../../../../shared/api/deezer/deezer-entity-type.enum';
import {ProviderQueryType} from '../provider-query-type.enum';
import {DeezerQueryType} from '../../../../shared/api/deezer/deezer-query-type.enum';
import {DeezerAlbum} from '../../../../shared/api/deezer/deezer-album';

@Injectable({
  providedIn: 'root'
})
export class DeezerProviderService extends Provider<DeezerContext> {

  type = ServiceProviderType.Deezer;

  entities = [ProviderContextType.Album];

  queryTypes = [ProviderQueryType.Artist, ProviderQueryType.Track];

  constructor(private readonly deezerDataService: DeezerDataService) {
    super();
  }

  search({query, entity, queryType}: SearchParams) {
    const entityValue = this.resolveEntity(entity);
    const queryTypeValue = this.resolveQueryType(queryType);

    if (!query || !entityValue || !queryTypeValue) {
      return of<DeezerContext[]>([]);
    }

    switch (queryTypeValue) {
      case DeezerQueryType.Track:
        return this.searchByTrack(query, entityValue);
    }

    return this.searchEntityByArtist(query, entityValue);
  }

  private searchByTrack(query: string, entity: DeezerEntityType) {
    switch (entity) {
      case DeezerEntityType.Album:
        return this.deezerDataService.advancedSearch(query, DeezerQueryType.Track).pipe(
          map(response => response.data.map<number>(data => data.album.id)),
          mergeMap(albumIds => {
            const requests$ = albumIds.map<Observable<DeezerAlbum>>(albumId =>
              this.deezerDataService.getAlbum(albumId).pipe(catchError(() => of(null)))) as Observable<DeezerAlbum>[];

            return forkJoin<Observable<DeezerAlbum>[]>(requests$).pipe(
              map(responses => responses.filter(response => response)),
              map(albums => albums.map(data => ({type: entity, data})))
            );
          })
        );
    }

    return of<DeezerContext[]>([]);
  }

  private searchEntityByArtist(query: string, entity: DeezerEntityType) {
    return this.deezerDataService.search(query, entity).pipe(
      map<DeezerResult, DeezerContext[]>(response =>
        response.data.map<DeezerContext>(data => ({type: entity, data}))),
      catchError(error => {
        console.error(`Unable to load data using Deezer provider`);
        return throwError(error);
      }),
    );
  }

  private resolveQueryType(queryType: ProviderQueryType) {
    switch (queryType) {
      case ProviderQueryType.Artist:
      case null:
        return DeezerQueryType.Artist;
      case ProviderQueryType.Track:
        return DeezerQueryType.Track;
    }

    return null;
  }

  private resolveEntity(entity: ProviderContextType) {
    switch (entity) {
      case ProviderContextType.Album:
      case null:
        return DeezerEntityType.Album;
    }

    return null;
  }
}
