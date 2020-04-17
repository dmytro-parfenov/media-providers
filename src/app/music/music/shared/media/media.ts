import {ContextAware} from './context-aware';
import {ServiceTypeAware} from './service-type-aware';

export type Media<C = any> = ServiceTypeAware & ContextAware<C>;
