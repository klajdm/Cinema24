import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  term = '';
  movies: any[] = [];
  searchExecuted = false;
  limit = 3;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {}

  getMovies() {
    if (this.term.trim() === '') {
      return;
    } else {
      this.movieService.searchMovies(this.term).subscribe((data: any) => {
        console.log(data);
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
