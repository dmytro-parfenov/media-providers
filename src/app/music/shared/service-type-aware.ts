import {ServiceProvider} from './service-provider.enum';

export interface ServiceTypeAware {
  type: ServiceProvider;
}
