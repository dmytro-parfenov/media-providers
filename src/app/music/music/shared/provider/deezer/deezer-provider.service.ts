import {Injectable} from '@angular/core';
import {DeezerDataService} from '../../../../shared/api/deezer-data.service';
import {Provider} from '../provider';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {DeezerSearchResult} from '../../../../shared/api/deezer/deezer-search-result';
import {SearchParams} from '../../../search-params';
import {DeezerContext} from './deezer-context';
import {ProviderContextType} from '../provider-context-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DeezerProviderService implements Provider<DeezerContext> {

  constructor(private readonly deezerDataService: DeezerDataService) { }

  search({artist}: SearchParams) {
    if (!artist) {
      return of<DeezerContext[]>([]);
    }

    return this.deezerDataService.searchAlbum(artist).pipe(
      map<DeezerSearchResult, DeezerContext[]>(response =>
        response.data.map<DeezerContext>(data => ({type: ProviderContextType.Album, data}))),
      catchError(error => {
        console.error(`Unable to load data using Deezer provider`);
        return throwError(error);
      }),
    );
  }
}
