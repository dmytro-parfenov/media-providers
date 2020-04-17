import {Inject, Injectable, Optional} from '@angular/core';
import {forkJoin, NEVER, Observable, of} from 'rxjs';
import {SERVICE_PROVIDER} from './service-provider';
import {Provider} from './provider/provider';
import {catchError, map} from 'rxjs/operators';
import {Media} from './media/media';
import {SearchParams} from './search-params';
import {ServiceProvider} from '../shared/service-provider.enum';
import {ItunesProviderService} from './provider/itunes/itunes-provider.service';
import {DeezerProviderService} from './provider/deezer/deezer-provider.service';

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

    const requests$ = this.providers.reduce<Observable<Media[]>[]>((previousResults, provider) => {
        const searchResults$ = provider.search(params).pipe(
          map(results => results.map<Media>(result => ({type: this.resolveProviderType(provider), context: result}))),
          catchError(() => of([]))
        );
        return previousResults.concat(searchResults$);
      },
      []
    );

    return forkJoin<Media[]>(requests$).pipe(
      map<[Media[]], Media[]>(response => [].concat(...response))
    );
  }

  private resolveProviderType(provider: Provider): ServiceProvider {
    if (provider instanceof DeezerProviderService) {
      return ServiceProvider.Deezer;
    }

    if (provider instanceof ItunesProviderService) {
      return ServiceProvider.iTunes;
    }

    console.error(`ServiceProvider type does not defined for:`, provider);
    throw new Error();
  }
}