import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {AdapterRef} from '../../shared/adapter-ref';
import {DeezerContext} from '../../../shared/provider/deezer/deezer-context';
import {DeezerAdapterFactoryService} from './deezer-adapter-factory.service';
import {ComponentPortal} from '@angular/cdk/portal';
import {AdapterEmitter} from '../../shared/adapter-emitter';

@Component({
  selector: 'app-deezer-adapter',
  templateUrl: './deezer-adapter.component.html',
  styleUrls: ['./deezer-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerAdapterComponent implements OnInit {

  portal: ComponentPortal<any>;

  emitter: AdapterEmitter = (data) => {
    if (!this.adapterRef) {
      return;
    }

    this.adapterRef.emit(data);
  }

  constructor(private readonly deezerAdapterFactoryService: DeezerAdapterFactoryService,
              @Optional() private readonly adapterRef: AdapterRef<DeezerContext>) { }

  ngOnInit() {
    if (!this.adapterRef) {
      return;
    }

    this.portal = this.deezerAdapterFactoryService.resolvePortal(this.adapterRef.context, this.emitter);
  }

}
