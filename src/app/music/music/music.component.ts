import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ResolvedData} from './resolved-data';
import {SearchParamsService} from './search-params.service';
import {SearchParams} from './search-params';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicComponent implements OnInit {

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly searchParamsService: SearchParamsService,
              private readonly searchService: SearchService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(this.onRouterDataChange.bind(this));
  }

  onSearchParamsChange(params: SearchParams) {
    this.searchParamsService.update(params);
    this.updateMediasBySearchParams(params);
  }

  private onRouterDataChange(data: ResolvedData) {
    this.updateMediasBySearchParams(data.searchParams);
  }

  private updateMediasBySearchParams(params: SearchParams) {
    this.searchService.do(params).pipe(
      tap(results => {
        console.log(results);
      })
    ).subscribe();
  }

}
