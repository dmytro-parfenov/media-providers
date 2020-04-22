import {ServiceProviderType} from '../../../shared/service-provider-type.enum';

export interface ServiceTypeAware {
  type: ServiceProviderType;
}
