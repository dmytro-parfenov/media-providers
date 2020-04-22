import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {catchError, finalize, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ResolvedData} from './resolved-data';
import {SearchParamsService} from './search-params.service';
import {SearchParams} from './search-params';
import {Media} from './shared/media/media';
import {MediaAdapterFactoryService} from './media/media-adapter-factory.service';
import {ItunesAdapterFactoryService} from './media/adapter/itunes-adapter/itunes-adapter-factory.service';
import {DeezerAdapterFactoryService} from './media/adapter/deezer-adapter/deezer-adapter-factory.service';
import {of} from 'rxjs';
import {MediaFactoryService} from './media-factory.service';
import {uniqBy} from 'lodash-es';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MediaAdapterFactoryService,
    ItunesAdapterFactoryService,
    DeezerAdapterFactoryService,
    MediaFactoryService
  ]
})
export class MusicComponent implements OnInit {

  medias: Media[] = [];

  searchParams: SearchParams;

  isLoading = false;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly searchParamsService: SearchParamsService,
              private readonly searchService: SearchService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly mediaFactoryService: MediaFactoryService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(this.onRouterDataChange.bind(this));
  }

  onSearchParamsChange(params: SearchParams) {
    this.searchParamsService.update(params);
    this.updateMediasBySearchParams(params);
  }

  private onRouterDataChange(data: ResolvedData) {
    this.searchParams = data.searchParams;
    this.changeDetectorRef.markForCheck();

    this.updateMediasBySearchParams(data.searchParams);
  }

  private updateMediasBySearchParams(params: SearchParams) {
    this.isLoading = true;
    this.changeDetectorRef.markForCheck();

    this.searchService.do(params).pipe(
      tap(medias => {
        this.medias = this.applySearchParams(medias, params);
        this.changeDetectorRef.markForCheck();
      }),
      catchError(() => {
        console.error(`Unable to load results`);
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe();
  }

  private applySearchParams(medias: Media[], params: SearchParams) {
    if (!params.uniq) {
      return medias;
    }

    return uniqBy(medias, media => {
      const mediaFactory = this.mediaFactoryService.create(media);
      const mediaContextManager = mediaFactory.create(media.context);

      return mediaContextManager.getName(media.context);
    });
  }

}
