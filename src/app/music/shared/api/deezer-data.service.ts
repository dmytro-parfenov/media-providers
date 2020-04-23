import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerResult} from './deezer/deezer-result';
import {DeezerEntityType} from './deezer/deezer-entity-type.enum';

/**
 * @see https://developers.deezer.com/api
 */
@Injectable({
  providedIn: 'root'
})
export class DeezerDataService {

  private readonly resourceUrl = 'https://api.deezer.com';

  constructor(private readonly httpClient: HttpClient) { }

  search(query: string, entity: DeezerEntityType) {
    return this.httpClient
      .jsonp<DeezerResult>(`${this.resourceUrl}/search/${entity}?q=${query}&output=jsonp`, 'callback');
  }

  getAlbumTracks(albumId: number) {
    return this.httpClient.jsonp<DeezerResult>(`${this.resourceUrl}/album/${albumId}/tracks&output=jsonp`, 'callback');
  }

}
