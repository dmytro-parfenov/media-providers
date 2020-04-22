import {Inject, Injectable, Optional} from '@angular/core';
import {forkJoin, NEVER, Observable, of} from 'rxjs';
import {SERVICE_PROVIDER} from './service-provider';
import {Provider} from './shared/provider/provider';
import {catchError, map} from 'rxjs/operators';
import {Media} from './shared/media/media';
import {SearchParams} from './search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(@Optional() @Inject(SERVICE_PROVIDER) private readonly providers: Provider[]) {}

  do(params: SearchParams) {
    if (!this.providers) {
      console.error(`Service providers are not defined`);
      return NEVER;
    }

    const providers = this.applySearchParamsToProviders(this.providers, params);

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

  private applySearchParamsToProviders(providers: Provider[], params: SearchParams) {
    if (!params.providers.length) {
      return providers;
    }

    return providers.filter(provider => params.providers.includes(provider.type));
  }
}
