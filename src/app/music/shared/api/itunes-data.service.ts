import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItunesSearch} from './itunes/itunes-search';

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
      .jsonp<ItunesSearch>(`${this.resourceUrl}/search?term=${artist}&entity=${entity}`, 'callback');
  }
}
