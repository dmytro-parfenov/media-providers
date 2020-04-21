import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {AdapterRef} from '../../shared/adapter-ref';
import {ItunesContext} from '../../../shared/provider/itunes/itunes-context';
import {ItunesAdapterFactoryService} from './itunes-adapter-factory.service';
import {ComponentPortal} from '@angular/cdk/portal';
import {AdapterEmitter} from '../../shared/adapter-emitter';

@Component({
  selector: 'app-itunes-adapter',
  templateUrl: './itunes-adapter.component.html',
  styleUrls: ['./itunes-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesAdapterComponent implements OnInit {

  portal: ComponentPortal<any>;

  emitter: AdapterEmitter = (data) => {
    if (!this.adapterRef) {
      return;
    }

    this.adapterRef.emit(data);
  }

  constructor(private readonly itunesAdapterFactoryService: ItunesAdapterFactoryService,
              @Optional() private readonly adapterRef: AdapterRef<ItunesContext>) { }

  ngOnInit() {
    if (!this.adapterRef) {
      return;
    }

    this.portal = this.itunesAdapterFactoryService.resolvePortal(this.adapterRef.context, this.emitter);
  }

}
