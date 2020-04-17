import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Media} from '../shared/media/media';
import {MediaFactoryService} from './media-factory.service';
import {ComponentPortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent {

  @Input() set media(media: Media) {
    this.mediaPortal = this.mediaFactoryService.createComponentPortal(media);
  }

  mediaPortal: ComponentPortal<any>;

  constructor(private readonly mediaFactoryService: MediaFactoryService) { }

}
