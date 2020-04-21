import {Injector, StaticProvider, ValueProvider} from '@angular/core';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {AdapterRef} from './adapter-ref';
import {AdapterEmitter} from './adapter-emitter';

export class AdapterFactory {

  protected createAdapterRefProvider<C = any, D = any>(context: C, emitter: AdapterEmitter<D>): ValueProvider {
    const adapterRef = new AdapterRef<C, D>(context, emitter);

    return {provide: AdapterRef, useValue: adapterRef};
  }

  protected createPortal<C>(componentType: ComponentType<C>, providers: StaticProvider[], parent?: Injector) {
    const injector = this.createInjector(providers, parent);

    return new ComponentPortal<C>(componentType, null, injector);
  }

  protected createInjector(providers: StaticProvider[], parent?: Injector) {
    return Injector.create({ parent, providers });
  }
}
