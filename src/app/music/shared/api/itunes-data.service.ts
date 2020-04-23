import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItunesResult} from './itunes/itunes-result';
import {ItunesMusicEntityType} from './itunes/itunes-music-entity-type.enum';

/**
 * @see https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
 */
@Injectable({
  providedIn: 'root'
})
export class ItunesDataService {

  private readonly resourceUrl = 'https://itunes.apple.com';

  constructor(private readonly httpClient: HttpClient) { }

  search(term: string, entity: ItunesMusicEntityType, attribute = 'artistTerm', media = 'music') {
    return this.httpClient
      .jsonp<ItunesResult>(`${this.resourceUrl}/search?term=${term}&media=${media}&entity=${entity}&attribute=${attribute}`, 'callback');
  }
}
