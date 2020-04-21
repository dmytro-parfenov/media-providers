import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerResult} from './deezer/deezer-result';

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
      .jsonp<DeezerResult>(`${this.resourceUrl}/search/album?q=${artist}&output=jsonp`, 'callback');
  }

  getAlbumTracks(albumId: number) {
    return this.httpClient.jsonp<DeezerResult>(`${this.resourceUrl}/album/${albumId}/tracks&output=jsonp`, 'callback');
  }

}
