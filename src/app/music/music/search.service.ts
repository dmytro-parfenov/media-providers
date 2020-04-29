import {Inject, Injectable, Optional} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {SERVICE_PROVIDERS} from './service-providers.key';
import {Provider} from './shared/provider/provider';
import {catchError, map} from 'rxjs/operators';
import {Media} from './shared/media/media';
import {SearchParams} from './search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(@Optional() @Inject(SERVICE_PROVIDERS) private readonly providers: Provider[]) {}

  do(params: SearchParams) {
    const providers = this.applySearchParamsToProviders(params, this.providers);

    if (!providers.length) {
      console.error(`Service providers are not defined`);
      return of([]);
    }

    const requests$ = providers.reduce<Observable<Media[]>[]>((previousResults, provider) => {
        const searchResults$ = provider.search(params).pipe(
          map<any[], Media[]>(results => results.map<Media>(result => ({type: provider.type, context: result}))),
          catchError(() => of([]))
        );
        return previousResults.concat(searchResults$);
      },
      []
    );

    return forkJoin<Observable<Media[]>[]>(requests$).pipe(
      map<Media[][], Media[]>(response => [].concat(...response))
    );
  }

  private applySearchParamsToProviders(params: SearchParams, providers: Provider[] = []) {
    if (!params.providers.length) {
      return providers;
    }

    return providers.filter(provider => params.providers.includes(provider.type));
  }
}
