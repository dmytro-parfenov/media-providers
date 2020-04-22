import {Injectable} from '@angular/core';
import {ItunesDataService} from '../../../../shared/api/itunes-data.service';
import {Provider} from '../provider';
import {catchError, map} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {ItunesResult} from '../../../../shared/api/itunes/itunes-result';
import {SearchParams} from '../../../search-params';
import {ItunesContext} from './itunes-context';
import {ProviderContextType} from '../provider-context-type.enum';
import {ServiceProvider} from '../../../../shared/service-provider.enum';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService implements Provider<ItunesContext> {

  type = ServiceProvider.iTunes;

  constructor(private readonly itunesDataService: ItunesDataService) { }

  search({artist}: SearchParams) {
    if (!artist) {
      return of<ItunesContext[]>([]);
    }

    return this.itunesDataService.search(artist).pipe(
      map<ItunesResult, ItunesContext[]>(response =>
        response.results.map<ItunesContext>(data => ({type: ProviderContextType.Album, data}))),
      catchError(error => {
        console.error(`Unable to load data using iTunes provider`);
        return throwError(error);
      }),
    );
  }
}
