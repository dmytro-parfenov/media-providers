import {Injectable} from '@angular/core';
import {DeezerDataService} from '../../shared/api/deezer-data.service';
import {Provider} from '../provider';
import {DeezerAlbum} from './deezer-album';
import {AlbumMedia} from '../../shared/album-media';
import {catchError, map} from 'rxjs/operators';
import {ServiceProvider} from '../../shared/service-provider.enum';
import {of} from 'rxjs';
import {DeezerSearch} from '../../shared/api/deezer/deezer-search';

@Injectable({
  providedIn: 'root'
})
export class DeezerProviderService implements Provider<DeezerAlbum> {

  constructor(private readonly deezerDataService: DeezerDataService) { }

  search(artist: string) {
    return this.deezerDataService.searchAlbum(artist).pipe(
      map<DeezerSearch, AlbumMedia<DeezerAlbum>[]>(response =>
        response.data.map(result => ({type: ServiceProvider.Deezer, album: result}))),
      catchError(() => {
        console.error(`Unable to load data with Deezer provider`);
        return of([]);
      }),
    );
  }
}
