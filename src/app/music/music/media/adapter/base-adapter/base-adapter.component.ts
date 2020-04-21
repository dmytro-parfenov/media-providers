import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {AdapterEmitter} from '../../shared/adapter-emitter';
import {AdapterRef} from '../../shared/adapter-ref';
import {AdapterFactory} from '../../shared/adapter-factory';

@Component({
  selector: 'app-base-adapter',
  templateUrl: './base-adapter.component.html',
  styleUrls: ['./base-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseAdapterComponent {

  portal: ComponentPortal<any>;

  emitter: AdapterEmitter = (data) => {
    if (!this.baseAdapterRef) {
      return;
    }

    this.baseAdapterRef.emit(data);
  }

  constructor(private readonly adapterFactory: AdapterFactory,
              private readonly baseAdapterRef: AdapterRef = null) {
    if (!baseAdapterRef) {
      return;
    }

    this.portal = this.adapterFactory.resolvePortal(baseAdapterRef.context, this.emitter);
  }

}
