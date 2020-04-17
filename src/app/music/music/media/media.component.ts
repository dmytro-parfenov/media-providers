import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Media} from '../shared/media/media';
import {MediaFactoryService} from './media-factory.service';
import {ComponentPortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent implements OnInit {

  @Input() set media(media: Media) {
    const componentType = this.mediaFactoryService.resolveComponentType(media.type);

    this.mediaPortal = new ComponentPortal(componentType);
  }

  mediaPortal: ComponentPortal<any>;

  constructor(private readonly mediaFactoryService: MediaFactoryService) { }

  ngOnInit() {
  }

}
