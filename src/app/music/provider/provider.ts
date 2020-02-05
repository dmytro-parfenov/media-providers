import {Observable} from 'rxjs';
import {Media} from '../shared/media';
import {SearchParams} from '../search-params';

export interface Provider<T = any> {
  search(params: SearchParams): Observable<Media<T>[]>;
}
