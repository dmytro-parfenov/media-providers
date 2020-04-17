import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {ItunesContext} from '../../shared/provider/itunes/itunes-context';
import {DEEZER_CONTEXT} from './deezer-context-key';

@Component({
  selector: 'app-deezer',
  templateUrl: './deezer.component.html',
  styleUrls: ['./deezer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerComponent implements OnInit {

  constructor(@Optional() @Inject(DEEZER_CONTEXT) private readonly context: ItunesContext) { }

  ngOnInit() {
    console.log(this.context);
  }

}
