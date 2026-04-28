import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  term = '';
  movies: any[] = [];
  searchExecuted = false;
  loading = false;
  loadingMore = false;
  selectedType = 'all';
  activeCategory = 'Trending';
  currentPage = 1;
  totalResults = 0;

  get hasMore(): boolean {
    return this.movies.length < this.totalResults;
  }

  readonly typeOptions = [
    { value: 'all', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'Series' },
  ];

  get featuredQueries() {
    return this.movieService.featuredQueries;
  }

  get skeletonItems() {
    return Array(8).fill(0);
  }

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    public watchlistService: WatchlistService,
  ) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
          this.loading = true;
          this.currentPage = 1;
          if (query.trim() === '') {
            this.loadCategory(this.activeCategory);
            return [];
          }
          return this.movieService.searchMovies(query, this.selectedType, 1);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((data: any) => {
        this.loading = false;
        this.searchExecuted = true;
        this.totalResults = parseInt(data?.totalResults ?? '0', 10);
        this.movies = Array.isArray(data?.Search)
          ? data.Search.map(this.mapMovie)
          : [];
      });

    this.loadCategory('Trending');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(): void {
    if (this.term.trim() === '') {
      this.searchExecuted = false;
      this.currentPage = 1;
      this.totalResults = 0;
      this.loadCategory(this.activeCategory);
      return;
    }
    this.searchSubject.next(this.term);
  }

  onTypeChange(): void {
    this.currentPage = 1;
    if (this.term.trim() !== '') {
      this.searchSubject.next(this.term);
    } else {
      this.loadCategory(this.activeCategory);
    }
  }

  loadCategory(label: string): void {
    this.activeCategory = label;
    this.currentPage = 1;
    const found = this.featuredQueries.find((q) => q.label === label);
    if (!found) return;
    this.loading = true;
    this.searchExecuted = false;
    this.movieService
      .searchMovies(found.query, this.selectedType, 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.loading = false;
        this.totalResults = parseInt(data?.totalResults ?? '0', 10);
        this.movies = Array.isArray(data?.Search)
          ? data.Search.map(this.mapMovie)
          : [];
      });
  }

  loadMore(): void {
    if (this.loadingMore || !this.hasMore) return;
    this.loadingMore = true;
    this.currentPage++;
    const query =
      this.term.trim() !== ''
        ? this.term
        : (this.featuredQueries.find((q) => q.label === this.activeCategory)
            ?.query ?? '');
    this.movieService
      .searchMovies(query, this.selectedType, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.loadingMore = false;
        if (Array.isArray(data?.Search)) {
          this.movies = [...this.movies, ...data.Search.map(this.mapMovie)];
        }
      });
  }

  toggleWatchlist(movie: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.watchlistService.toggle(movie);
  }

  getPosterUrl(poster: string): string {
    return poster && poster !== 'N/A'
      ? poster
      : 'https://placehold.co/300x450/252230/cdc2dc?text=No+Poster';
  }

  private mapMovie = (item: any) => ({
    Poster: item.Poster,
    Title: item.Title,
    Type: item.Type,
    Year: parseInt(item.Year),
    imdbID: item.imdbID,
  });
}
