import {Inject, Injectable, Optional} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {SERVICE_PROVIDERS} from './service-key.provider';
import {Provider} from './provider/provider';
import {catchError, map} from 'rxjs/operators';
import {Media} from './shared/media';
import {SearchParams} from './search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(@Optional() @Inject(SERVICE_PROVIDERS) private readonly providers: Provider[]) {}

  do(params: SearchParams) {
    if (!this.providers) {
      console.error(`Service providers unavailable`);
      return of<Media[]>([]);
    }

    const requests$ = this.providers.reduce<Observable<Media[]>[]>((previousProvider, currentProvider) => {
        const search$ = currentProvider.search(params).pipe(catchError(() => of([])));
        return previousProvider.concat(search$);
      },
      []
    );

    return forkJoin<Media[]>(requests$).pipe(
      map<[Media[]], Media[]>(response => [].concat(...response))
    );
  }
}
