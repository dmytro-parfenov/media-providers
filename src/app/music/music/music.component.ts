import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicComponent implements OnInit {

  constructor(private readonly searchService: SearchService) { }

  ngOnInit() {
    this.searchService.do({artist: 'guns and roses'}).pipe(
      tap(results => {
        console.log(results);
      })
    ).subscribe();
  }

}
