import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  term = '';
  movies: any[] = [];
  searchExecuted = false;
  limit = 3;

  constructor(private movieService: MovieService) {}

  InitialMovies() {
    this.movieService.searchMovies('2023').subscribe((data: any) => {
      if (Array.isArray(data.Search)) {
        this.movies = data.Search.map((item: any) => ({
          Poster: item.Poster,
          Title: item.Title,
          Type: item.Type,
          Year: parseInt(item.Year),
          imdbID: item.imdbID,
        }));
      } else {
        this.movies = [];
      }
    });
  }

  ngOnInit(): void {
    this.InitialMovies();
  }

  getMovies() {
    if (this.term.trim() === '') {
      return;
    } else {
      this.movieService.searchMovies(this.term).subscribe((data: any) => {
        if (Array.isArray(data.Search)) {
          this.movies = data.Search.slice(0, this.limit).map((item: any) => ({
            Poster: item.Poster,
            Title: item.Title,
            Type: item.Type,
            Year: parseInt(item.Year),
            imdbID: item.imdbID,
          }));
        } else {
          this.movies = [];
        }
        this.searchExecuted = true;
      });
    }
  }
  onLimitChange() {
    this.getMovies();
  }
}
