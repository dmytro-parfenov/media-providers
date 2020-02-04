import {Observable} from 'rxjs';
import {AlbumMedia} from '../shared/album-media';

export interface Provider<T = any> {
  search(artist: string): Observable<AlbumMedia<T>[]>;
}
