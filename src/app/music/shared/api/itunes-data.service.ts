import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ItunesResult} from './itunes/itunes-result';
import {ItunesMusicEntityType} from './itunes/itunes-music-entity-type.enum';
import {ItunesAttributeType} from './itunes/itunes-attribute-type.enum';
import {Observable} from 'rxjs';
import {ItunesAlbum} from './itunes/itunes-album';
import {ItunesTrack} from './itunes/itunes-track';

/**
 * @see https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
 */
@Injectable({
  providedIn: 'root'
})
export class ItunesDataService {

  private readonly resourceUrl = 'https://itunes.apple.com';

  constructor(private readonly httpClient: HttpClient) { }

  search(
    term: string,
    entity: ItunesMusicEntityType.Album,
    attribute: ItunesAttributeType): Observable<ItunesResult<ItunesAlbum>>;
  search(
    term: string,
    entity: ItunesMusicEntityType.Song,
    attribute: ItunesAttributeType): Observable<ItunesResult<ItunesTrack>>;
  search(term: string,
         entity: ItunesMusicEntityType.Album | ItunesMusicEntityType.Song,
         attribute: ItunesAttributeType): Observable<ItunesResult>;
  search(term: string,
         entity: ItunesMusicEntityType,
         attribute: ItunesAttributeType,
         media = 'music'): Observable<ItunesResult> {
    return this.httpClient
      .jsonp<ItunesResult>(`${this.resourceUrl}/search?term=${term}&media=${media}&entity=${entity}&attribute=${attribute}`, 'callback');
  }
}
