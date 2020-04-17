import {ServiceProvider} from '../../../shared/service-provider.enum';

export interface ServiceTypeAware {
  type: ServiceProvider;
}
