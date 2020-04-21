import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {AdapterRef} from '../../shared/adapter-ref';
import {DeezerContext} from '../../../shared/provider/deezer/deezer-context';
import {DeezerAdapterFactoryService} from './deezer-adapter-factory.service';
import {BaseAdapterComponent} from '../base-adapter/base-adapter.component';

@Component({
  selector: 'app-deezer-adapter',
  templateUrl: './deezer-adapter.component.html',
  styleUrls: ['./deezer-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerAdapterComponent extends BaseAdapterComponent {

  constructor(private readonly deezerAdapterFactoryService: DeezerAdapterFactoryService,
              @Optional() private readonly adapterRef: AdapterRef<DeezerContext>) {
    super(deezerAdapterFactoryService, adapterRef);
  }

}
