import {Injectable} from '@angular/core';
import {ItunesDataService} from '../../shared/api/itunes-data.service';
import {Provider} from '../provider';
import {ItunesAlbum} from './itunes-album';
import {AlbumMedia} from '../../shared/album-media';
import {catchError, map} from 'rxjs/operators';
import {ServiceProvider} from '../../shared/service-provider.enum';
import {of} from 'rxjs';
import {ItunesSearch} from '../../shared/api/itunes/itunes-search';

@Injectable({
  providedIn: 'root'
})
export class ItunesProviderService implements Provider<ItunesAlbum> {

  constructor(private readonly itunesDataService: ItunesDataService) { }

  search(artist: string) {
    return this.itunesDataService.search(artist).pipe(
      map<ItunesSearch, AlbumMedia<ItunesAlbum>[]>(response =>
        response.results.map(result => ({type: ServiceProvider.iTunes, album: result}))),
      catchError(() => {
        console.error(`Unable to load data with iTunes provider`);
        return of([]);
      }),
    );
  }
}
