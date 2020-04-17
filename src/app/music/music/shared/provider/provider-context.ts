import {ProviderContextDataAware} from './provider-context-data-aware';
import {ProviderContextTypeAware} from './provider-context-type-aware';

export type ProviderContext<D = any> = ProviderContextDataAware<D> & ProviderContextTypeAware;
