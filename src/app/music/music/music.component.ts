import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ResolvedData} from './resolved-data';
import {SearchParamsService} from './search-params.service';
import {SearchParams} from './search-params';
import {Media} from './shared/media/media';
import {MediaFactoryService} from './media/media-factory.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MediaFactoryService]
})
export class MusicComponent implements OnInit {

  medias: Media[] = [];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly searchParamsService: SearchParamsService,
              private readonly searchService: SearchService,
              private readonly changeDetectorRef: ChangeDetectorRef) { }

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
      tap(medias => {
        this.medias = medias;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe();
  }

}
