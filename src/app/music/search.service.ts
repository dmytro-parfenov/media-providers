import {Inject, Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {SERVICE_PROVIDERS} from './service-key.provider';
import {Provider} from './provider/provider';
import {map} from 'rxjs/operators';
import {AlbumMedia} from './shared/album-media';
import {SearchParams} from './search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(@Inject(SERVICE_PROVIDERS) private readonly providers: Provider[]) {}

  do({artist}: SearchParams) {
    const requests$ = this.providers.reduce<Observable<AlbumMedia[]>[]>((previousProvider, currentProvider) => {
        const search$ = currentProvider.search(artist);
        return previousProvider.concat(search$);
      },
      []
    );

    return forkJoin<AlbumMedia[]>(requests$).pipe(
      map<[AlbumMedia[]], AlbumMedia[]>(response => [].concat(...response))
    );
  }
}
