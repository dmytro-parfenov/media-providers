import {Injectable} from '@angular/core';
import {ItunesDataService} from '../../../../shared/api/itunes-data.service';
import {Provider} from '../provider';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {ItunesSearchResult} from '../../../../shared/api/itunes/itunes-search-result';
import {SearchParams} from '../../../search-params';
import {ItunesContext} from './itunes-context';
import {ProviderContextType} from '../provider-context-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService implements Provider<ItunesContext> {

  constructor(private readonly itunesDataService: ItunesDataService) { }

  search({artist}: SearchParams) {
    if (!artist) {
      return of<ItunesContext[]>([]);
    }

    return this.itunesDataService.search(artist).pipe(
      map<ItunesSearchResult, ItunesContext[]>(response =>
        response.results.map<ItunesContext>(data => ({type: ProviderContextType.Album, data}))),
      catchError(error => {
        console.error(`Unable to load data using iTunes provider`);
        return throwError(error);
      }),
    );
  }
}
