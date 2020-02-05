import {Injectable} from '@angular/core';
import {DeezerDataService} from '../../../shared/api/deezer-data.service';
import {Provider} from '../provider';
import {DeezerAlbum} from './deezer-album';
import {Media} from '../../media/media';
import {catchError, map} from 'rxjs/operators';
import {ServiceProvider} from '../../../shared/service-provider.enum';
import {of, throwError} from 'rxjs';
import {DeezerSearch} from '../../../shared/api/deezer/deezer-search';
import {SearchParams} from '../../search-params';

@Injectable({
  providedIn: 'root'
})
export class DeezerProviderService implements Provider<DeezerAlbum> {

  constructor(private readonly deezerDataService: DeezerDataService) { }

  search({artist}: SearchParams) {
    if (!artist) {
      return of<Media<DeezerAlbum>[]>([]);
    }

    return this.deezerDataService.searchAlbum(artist).pipe(
      map<DeezerSearch, Media<DeezerAlbum>[]>(response =>
        response.data.map(result => ({type: ServiceProvider.Deezer, data: result}))),
      catchError(error => {
        console.error(`Unable to load data with Deezer provider`);
        return throwError(error);
      }),
    );
  }
}
