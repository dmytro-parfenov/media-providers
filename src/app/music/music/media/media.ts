import {DataAware} from './data-aware';
import {ServiceTypeAware} from './service-type-aware';

export type Media<T = any> = ServiceTypeAware & DataAware<T>;
