import {ProviderContextDataAware} from '../provider-context-data-aware';
import {DeezerContextTypeAware} from './deezer-context-type-aware';

export type DeezerContext<D = any> = ProviderContextDataAware<D> & DeezerContextTypeAware;
