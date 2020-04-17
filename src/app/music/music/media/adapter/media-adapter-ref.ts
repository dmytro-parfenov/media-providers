import {MediaAdapterEmitter} from './media-adapter-emitter';

export class MediaAdapterRef<C = any, D = any> {

  constructor(public context: C,
              public emit: MediaAdapterEmitter<D>) {
  }

}
