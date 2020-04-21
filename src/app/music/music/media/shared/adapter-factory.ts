import {Injector, StaticProvider, ValueProvider} from '@angular/core';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {AdapterRef} from './adapter-ref';
import {AdapterEmitter} from './adapter-emitter';

export abstract class AdapterFactory<C= any, D = any> {

  abstract resolvePortal(context: C, emitter: AdapterEmitter<D>): ComponentPortal<any>;

  protected createAdapterRefProvider(context: C, emitter: AdapterEmitter<D>): ValueProvider {
    const adapterRef = new AdapterRef<C, D>(context, emitter);

    return {provide: AdapterRef, useValue: adapterRef};
  }

  protected createPortal<T>(componentType: ComponentType<T>, providers: StaticProvider[], parent?: Injector) {
    const injector = this.createInjector(providers, parent);

    return new ComponentPortal<T>(componentType, null, injector);
  }

  protected createInjector(providers: StaticProvider[], parent?: Injector) {
    return Injector.create({ parent, providers });
  }
}
