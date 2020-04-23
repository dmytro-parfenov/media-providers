import {Observable} from 'rxjs';
import {SearchParams} from '../../search-params';
import {ServiceProviderType} from '../../../shared/service-provider-type.enum';
import {ProviderContextType} from './provider-context-type.enum';

export abstract class Provider<C = any> {
  abstract type: ServiceProviderType;

  entities: ProviderContextType[] = [];

  abstract search(params: SearchParams): Observable<C[]>;
}
