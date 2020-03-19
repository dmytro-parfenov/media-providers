import {Observable} from 'rxjs';
import {SearchParams} from '../search-params';

export interface Provider<D = any> {
  search(params: SearchParams): Observable<D[]>;
}
