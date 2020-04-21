import {AdapterEmitter} from './adapter-emitter';

export class AdapterRef<C = any, D = any> {

  constructor(public context: C,
              public emit: AdapterEmitter<D>) {
  }

}
