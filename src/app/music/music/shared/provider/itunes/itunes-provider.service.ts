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
import {ItunesContextType} from './itunes-context-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService extends Provider<ItunesContext> {

  type = ServiceProviderType.iTunes;

  entities = [ProviderContextType.Album];

  constructor(private readonly itunesDataService: ItunesDataService) {
    super();
  }

  search({query}: SearchParams) {
    if (!query) {
      return of<ItunesContext[]>([]);
    }

    return this.itunesDataService.search(query).pipe(
      map<ItunesResult, ItunesContext[]>(response =>
        response.results.map<ItunesContext>(data => ({type: ItunesContextType.Album, data}))),
      catchError(error => {
        console.error(`Unable to load data using iTunes provider`);
        return throwError(error);
      }),
    );
  }
}
