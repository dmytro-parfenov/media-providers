import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerResult} from './deezer/deezer-result';
import {DeezerEntityType} from './deezer/deezer-entity-type.enum';
import {DeezerTrack} from './deezer/deezer-track';
import {DeezerQueryType} from './deezer/deezer-query-type.enum';
import {Observable} from 'rxjs';
import {DeezerAlbum} from './deezer/deezer-album';

/**
 * @see https://developers.deezer.com/api
 */
@Injectable({
  providedIn: 'root'
})
export class DeezerDataService {

  private readonly resourceUrl = 'https://api.deezer.com';

  constructor(private readonly httpClient: HttpClient) { }

  /**
   * Search by artist
   */
  search(query: string, entity: DeezerEntityType.Album): Observable<DeezerResult<DeezerAlbum>>;
  search(query: string, entity: DeezerEntityType): Observable<DeezerResult> {
    return this.httpClient
      .jsonp<DeezerResult>(`${this.resourceUrl}/search/${entity}?q=${query}&output=jsonp`, 'callback');
  }

  /**
   * Search entity by type
   */
  advancedSearch(query: string, queryType: DeezerQueryType.Artist): Observable<DeezerResult>;
  advancedSearch(query: string, queryType: DeezerQueryType.Track): Observable<DeezerResult<DeezerTrack>>;
  advancedSearch(query: string, queryType: DeezerQueryType): Observable<DeezerResult> {
    return this.httpClient
      .jsonp<DeezerResult>(`${this.resourceUrl}/search?q=${queryType}"${query}"&output=jsonp`, 'callback');
  }

  getAlbumTracks(albumId: number) {
    return this.httpClient.jsonp<DeezerResult<DeezerTrack>>(`${this.resourceUrl}/album/${albumId}/tracks&output=jsonp`, 'callback');
  }

  getAlbum(albumId: number) {
    return this.httpClient.jsonp<DeezerAlbum>(`${this.resourceUrl}/album/${albumId}&output=jsonp`, 'callback');
  }

}
