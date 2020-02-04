import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerSearch} from './deezer/deezer-search';

/**
 * @see https://developers.deezer.com/api
 */
@Injectable({
  providedIn: 'root'
})
export class DeezerDataService {

  private readonly resourceUrl = 'https://api.deezer.com';

  constructor(private readonly httpClient: HttpClient) { }

  searchAlbum(artist: string) {
    return this.httpClient
      .jsonp<DeezerSearch>(`${this.resourceUrl}/search/album?q=${artist}&output=jsonp`, 'callback');
  }
}
