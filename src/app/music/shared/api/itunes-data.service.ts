import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItunesResult} from './itunes/itunes-result';

/**
 * @see https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
 */
@Injectable({
  providedIn: 'root'
})
export class ItunesDataService {

  private readonly resourceUrl = 'https://itunes.apple.com';

  constructor(private readonly httpClient: HttpClient) { }

  search(artist: string, entity = 'album') {
    return this.httpClient
      .jsonp<ItunesResult>(`${this.resourceUrl}/search?term=${artist}&entity=${entity}`, 'callback');
  }
}
