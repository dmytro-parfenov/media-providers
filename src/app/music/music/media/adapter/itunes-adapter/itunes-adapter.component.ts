import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {AdapterRef} from '../../shared/adapter-ref';
import {ItunesContext} from '../../../shared/provider/itunes/itunes-context';
import {ItunesAdapterFactoryService} from './itunes-adapter-factory.service';
import {BaseAdapterComponent} from '../base-adapter/base-adapter.component';

@Component({
  selector: 'app-itunes-adapter',
  templateUrl: './itunes-adapter.component.html',
  styleUrls: ['./itunes-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesAdapterComponent extends BaseAdapterComponent {

  constructor(private readonly itunesAdapterFactoryService: ItunesAdapterFactoryService,
              @Optional() private readonly adapterRef: AdapterRef<ItunesContext>) {
    super(itunesAdapterFactoryService, adapterRef);
  }

}
