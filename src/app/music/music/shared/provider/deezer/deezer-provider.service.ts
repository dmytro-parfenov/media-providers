import {Injectable} from '@angular/core';
import {DeezerDataService} from '../../../../shared/api/deezer-data.service';
import {Provider} from '../provider';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {DeezerResult} from '../../../../shared/api/deezer/deezer-result';
import {SearchParams} from '../../../search-params';
import {DeezerContext} from './deezer-context';
import {ProviderContextType} from '../provider-context-type.enum';
import {ServiceProviderType} from '../../../../shared/service-provider-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DeezerProviderService implements Provider<DeezerContext> {

  type = ServiceProviderType.Deezer;

  entities = [ProviderContextType.Album];

  constructor(private readonly deezerDataService: DeezerDataService) { }

  search({query}: SearchParams) {
    if (!query) {
      return of<DeezerContext[]>([]);
    }

    return this.deezerDataService.searchAlbum(query).pipe(
      map<DeezerResult, DeezerContext[]>(response =>
        response.data.map<DeezerContext>(data => ({type: ProviderContextType.Album, data}))),
      catchError(error => {
        console.error(`Unable to load data using Deezer provider`);
        return throwError(error);
      }),
    );
  }
}
