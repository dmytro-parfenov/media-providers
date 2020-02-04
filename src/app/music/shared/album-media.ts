import {AlbumAware} from './album-aware';
import {ServiceTypeAware} from './service-type-aware';

export type AlbumMedia<T = any> = ServiceTypeAware & AlbumAware<T>;
