import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {MediaAdapterRef} from '../media-adapter-ref';
import {ItunesContext} from '../../../shared/provider/itunes/itunes-context';

@Component({
  selector: 'app-itunes-adapter',
  templateUrl: './itunes-adapter.component.html',
  styleUrls: ['./itunes-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesAdapterComponent implements OnInit {

  constructor(@Optional() private readonly mediaAdapterRef: MediaAdapterRef<ItunesContext>) { }

  ngOnInit() {
    console.log(this.mediaAdapterRef);
  }

}
