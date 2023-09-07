import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    // Get the IMDb ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      const imdbID = params.get('id');
      if (imdbID) {
        this.movieService.searchMoviesById(imdbID).subscribe((data: any) => {
          this.movie = data;
        });
      }
    });
  }
}
