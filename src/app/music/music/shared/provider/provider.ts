import {Observable} from 'rxjs';
import {SearchParams} from '../../search-params';
import {ServiceProviderType} from '../../../shared/service-provider-type.enum';
import {ProviderContextType} from './provider-context-type.enum';

export interface Provider<C = any> {
  type: ServiceProviderType;

  entities: ProviderContextType[];

  search(params: SearchParams): Observable<C[]>;
}
