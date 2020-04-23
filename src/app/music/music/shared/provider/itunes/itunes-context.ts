import {ProviderContextDataAware} from '../provider-context-data-aware';
import {ItunesContextTypeAware} from './itunes-context-type-aware';

export type ItunesContext<D = any> = ProviderContextDataAware<D> & ItunesContextTypeAware;
