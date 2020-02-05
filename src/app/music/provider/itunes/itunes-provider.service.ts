import {Injectable} from '@angular/core';
import {ItunesDataService} from '../../shared/api/itunes-data.service';
import {Provider} from '../provider';
import {ItunesAlbum} from './itunes-album';
import {Media} from '../../shared/media';
import {catchError, map} from 'rxjs/operators';
import {ServiceProvider} from '../../shared/service-provider.enum';
import {throwError} from 'rxjs';
import {ItunesSearch} from '../../shared/api/itunes/itunes-search';
import {SearchParams} from '../../search-params';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService implements Provider<ItunesAlbum> {

  constructor(private readonly itunesDataService: ItunesDataService) { }

  search({artist}: SearchParams) {
    return this.itunesDataService.search(artist).pipe(
      map<ItunesSearch, Media<ItunesAlbum>[]>(response =>
        response.results.map(result => ({type: ServiceProvider.iTunes, data: result}))),
      catchError(error => {
        console.error(`Unable to load data with iTunes provider`);
        return throwError(error);
      }),
    );
  }
}
