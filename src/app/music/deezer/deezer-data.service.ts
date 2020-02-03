import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeezerDataService {

  private readonly resourceUrl = 'https://api.deezer.com';

  constructor(private readonly httpClient: HttpClient) { }

  searchAlbum(artist: string) {
    return this.httpClient
      .jsonp(`${this.resourceUrl}/search/album?q=${artist}&output=jsonp`, 'callback');
  }
}
