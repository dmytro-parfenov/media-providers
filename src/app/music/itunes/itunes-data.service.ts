import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItunesDataService {

  private readonly resourceUrl = 'https://itunes.apple.com';

  constructor(private readonly httpClient: HttpClient) { }

  search(artist: string, entity = 'album') {
    return this.httpClient
      .jsonp(`${this.resourceUrl}/search?term=${artist}&entity=${entity}`, 'callback');
  }
}
