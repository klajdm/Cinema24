import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Movie } from '../models/movie.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movieUrl = 'https://www.omdbapi.com/';
  private apiKey = environment.apiKey;

  constructor(private httpClient: HttpClient) {}

  // Method to retrieve the movies by search

  searchMovies(query: string): Observable<Array<Movie>> {
    if (query === '') {
      return of([]);
    }
    return this.httpClient.get<Array<Movie>>(
      `${this.movieUrl}?apikey=${this.apiKey}&s=${query}`
    );
  }

  // Method to retrieve the movies by ID

  searchMoviesById(imdbID: string): Observable<any> {
    const url = `${this.movieUrl}?apikey=${this.apiKey}&i=${imdbID}`;
    return this.httpClient.get(url);
  }
}
