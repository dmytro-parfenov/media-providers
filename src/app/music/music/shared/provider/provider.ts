import {Observable} from 'rxjs';
import {SearchParams} from '../../search-params';
import {ServiceProvider} from '../../../shared/service-provider.enum';

export interface Provider<C = any> {
  type: ServiceProvider;

  search(params: SearchParams): Observable<C[]>;
}
