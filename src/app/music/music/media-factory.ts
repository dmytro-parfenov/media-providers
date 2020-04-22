import {MediaContextManager} from './factory/media-context-manager';

export interface MediaFactory<C = any> {
  create(context: C): MediaContextManager;
}
