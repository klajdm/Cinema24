import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: any;
  loading = true;
  plotExpanded = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public watchlistService: WatchlistService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const imdbID = params.get('id');
      if (imdbID) {
        this.loading = true;
        this.movieService
          .searchMoviesById(imdbID)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.movie = data;
            this.loading = false;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleWatchlist(): void {
    if (this.movie) {
      this.watchlistService.toggle(this.movie);
    }
  }

  get isInWatchlist(): boolean {
    return this.movie
      ? this.watchlistService.isInWatchlist(this.movie.imdbID)
      : false;
  }

  getPosterUrl(poster: string): string {
    return poster && poster !== 'N/A'
      ? poster
      : 'https://placehold.co/300x450/252230/cdc2dc?text=No+Poster';
  }

  getRatingSource(source: string): string {
    const icons: Record<string, string> = {
      'Internet Movie Database': 'star',
      'Rotten Tomatoes': 'local_movies',
      Metacritic: 'speed',
    };
    return icons[source] || 'grade';
  }

  getGenres(): string[] {
    return this.movie?.Genre ? this.movie.Genre.split(', ') : [];
  }
}
