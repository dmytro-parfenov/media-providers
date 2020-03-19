import {Injectable} from '@angular/core';
import {ItunesDataService} from '../../../shared/api/itunes-data.service';
import {Provider} from '../provider';
import {ItunesAlbum} from './itunes-album';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {ItunesSearchResult} from '../../../shared/api/itunes/itunes-search-result';
import {SearchParams} from '../../search-params';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService implements Provider<ItunesAlbum> {

  constructor(private readonly itunesDataService: ItunesDataService) { }

  search({artist}: SearchParams) {
    if (!artist) {
      return of<ItunesAlbum[]>([]);
    }

    return this.itunesDataService.search(artist).pipe(
      map<ItunesSearchResult, ItunesAlbum[]>(response => response.results),
      catchError(error => {
        console.error(`Unable to load data using iTunes provider`);
        return throwError(error);
      }),
    );
  }
}
