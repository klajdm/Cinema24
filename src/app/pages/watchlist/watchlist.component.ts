import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
})
export class WatchlistComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  private destroy$ = new Subject<void>();

  constructor(public watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.watchlistService.watchlist$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => (this.movies = list));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  remove(imdbID: string): void {
    this.watchlistService.remove(imdbID);
  }

  getPosterUrl(poster: string): string {
    return poster && poster !== 'N/A'
      ? poster
      : 'https://placehold.co/300x450/252230/cdc2dc?text=No+Poster';
  }
}
