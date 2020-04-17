import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Media} from '../shared/media/media';
import {MediaAdapterFactoryService} from './media-adapter-factory.service';
import {ComponentPortal} from '@angular/cdk/portal';
import {MediaAdapterEmitter} from './adapter/media-adapter-emitter';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent {

  @Input() set media(media: Media) {
    this.portal = this.mediaAdapterFactoryService.resolvePortal(media, this.emitter);
  }

  @Output() mediaChange = new EventEmitter<any>();

  portal: ComponentPortal<any>;

  emitter: MediaAdapterEmitter = (data) => {
    this.mediaChange.emit(data);
  }

  constructor(private readonly mediaAdapterFactoryService: MediaAdapterFactoryService) { }

}
