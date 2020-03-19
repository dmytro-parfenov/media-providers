import {Injectable} from '@angular/core';
import {DeezerDataService} from '../../../shared/api/deezer-data.service';
import {Provider} from '../provider';
import {DeezerAlbum} from './deezer-album';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {DeezerSearchResult} from '../../../shared/api/deezer/deezer-search-result';
import {SearchParams} from '../../search-params';

@Injectable({
  providedIn: 'root'
})
export class DeezerProviderService implements Provider<DeezerAlbum> {

  constructor(private readonly deezerDataService: DeezerDataService) { }

  search({artist}: SearchParams) {
    if (!artist) {
      return of<DeezerAlbum[]>([]);
    }

    return this.deezerDataService.searchAlbum(artist).pipe(
      map<DeezerSearchResult, DeezerAlbum[]>(response => response.data),
      catchError(error => {
        console.error(`Unable to load data using Deezer provider`);
        return throwError(error);
      }),
    );
  }
}
