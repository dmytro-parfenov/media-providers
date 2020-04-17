import {Observable} from 'rxjs';
import {SearchParams} from '../../search-params';

export interface Provider<C = any> {
  search(params: SearchParams): Observable<C[]>;
}
