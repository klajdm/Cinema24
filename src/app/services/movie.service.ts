import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieUrl = 'https://www.omdbapi.com/';
  private apiKey = environment.apiKey;

  readonly featuredQueries: { label: string; query: string }[] = [
    { label: 'Trending', query: 'marvel' },
    { label: 'Sci-Fi', query: 'space' },
    { label: 'Action', query: 'mission' },
    { label: 'Drama', query: 'drama' },
  ];

  constructor(private httpClient: HttpClient) {}

  searchMovies(
    query: string,
    type: string = '',
    page: number = 1,
  ): Observable<any> {
    if (query.trim() === '') {
      return of({ Search: [], totalResults: '0' });
    }
    const typeParam = type && type !== 'all' ? `&type=${type}` : '';
    return this.httpClient.get<any>(
      `${this.movieUrl}?apikey=${this.apiKey}&s=${encodeURIComponent(query)}${typeParam}&page=${page}`,
    );
  }

  searchMoviesById(imdbID: string): Observable<any> {
    const url = `${this.movieUrl}?apikey=${this.apiKey}&i=${imdbID}&plot=full`;
    return this.httpClient.get(url);
  }
}
