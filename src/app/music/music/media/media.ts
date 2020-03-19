import {DataAware} from './data-aware';
import {ServiceTypeAware} from './service-type-aware';

export type Media<D = any> = ServiceTypeAware & DataAware<D>;
