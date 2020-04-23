import {ServiceProviderType} from '../shared/service-provider-type.enum';
import {ProviderContextType} from './shared/provider/provider-context-type.enum';

export class SearchParams {
  constructor(public query = '',
              public uniq = false,
              public providers: ServiceProviderType[] = [],
              public entity: ProviderContextType = null) {
  }
}
