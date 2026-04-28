import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private storageKey = 'cinema24_watchlist';
  private watchlistSubject = new BehaviorSubject<Movie[]>(this.load());

  watchlist$ = this.watchlistSubject.asObservable();

  private load(): Movie[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(movies: Movie[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
    this.watchlistSubject.next(movies);
  }

  getAll(): Movie[] {
    return this.watchlistSubject.getValue();
  }

  isInWatchlist(imdbID: string): boolean {
    return this.getAll().some((m) => m.imdbID === imdbID);
  }

  toggle(movie: Movie): void {
    const current = this.getAll();
    if (this.isInWatchlist(movie.imdbID)) {
      this.save(current.filter((m) => m.imdbID !== movie.imdbID));
    } else {
      this.save([...current, movie]);
    }
  }

  remove(imdbID: string): void {
    this.save(this.getAll().filter((m) => m.imdbID !== imdbID));
  }
}
