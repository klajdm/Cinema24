import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Movie } from '../models/movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieUrl = 'http://www.omdbapi.com/';
  private apiKey = environment.apiKey;

  constructor(private httpClient: HttpClient) {}

  searchMovies(query: string): Observable<Array<Movie>> {
    if (query === '') {
      return of([]);
    }
    return this.httpClient.get<Array<Movie>>(
      `${this.movieUrl}?apikey=${this.apiKey}&s=${query}`
    );
  }

  searchMoviesById(imdbID: string): Observable<any> {
    const url = `${this.movieUrl}?apikey=${this.apiKey}&i=${imdbID}`;
    return this.httpClient.get(url);
  }
}
