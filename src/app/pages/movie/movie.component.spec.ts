import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovieComponent } from './movie.component';
import { MovieService } from 'src/app/services/movie.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let httpMock: HttpTestingController;
  let watchlistService: WatchlistService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTooltipModule,
      ],
      declarations: [MovieComponent],
      providers: [MovieService, WatchlistService],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    watchlistService = TestBed.inject(WatchlistService);
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with loading true', () => {
    expect(component.loading).toBeTrue();
  });

  it('should start with plotExpanded false', () => {
    expect(component.plotExpanded).toBeFalse();
  });

  it('getPosterUrl should return placeholder for N/A', () => {
    expect(component.getPosterUrl('N/A')).toContain('placehold.co');
  });

  it('getPosterUrl should return placeholder for empty string', () => {
    expect(component.getPosterUrl('')).toContain('placehold.co');
  });

  it('getPosterUrl should return the url when valid', () => {
    const url = 'https://example.com/img.jpg';
    expect(component.getPosterUrl(url)).toBe(url);
  });

  it('getGenres should return single item for N/A genre', () => {
    component.movie = { Genre: 'N/A' };
    expect(component.getGenres()).toEqual(['N/A']);
  });

  it('getGenres should split genres correctly', () => {
    component.movie = { Genre: 'Action, Drama, Thriller' };
    expect(component.getGenres()).toEqual(['Action', 'Drama', 'Thriller']);
  });

  it('getGenres should return empty array when movie is undefined', () => {
    component.movie = undefined;
    expect(component.getGenres()).toEqual([]);
  });

  it('getRatingSource should return star for IMDb', () => {
    expect(component.getRatingSource('Internet Movie Database')).toBe('star');
  });

  it('getRatingSource should return grade for unknown source', () => {
    expect(component.getRatingSource('Unknown Source')).toBe('grade');
  });

  it('isInWatchlist should be false when movie is not saved', () => {
    component.movie = { imdbID: 'tt9999999' };
    expect(component.isInWatchlist).toBeFalse();
  });

  it('toggleWatchlist should add movie to watchlist', () => {
    component.movie = {
      imdbID: 'tt1234567',
      Title: 'Test',
      Poster: 'N/A',
      Type: 'movie',
      Year: 2024,
    };
    component.toggleWatchlist();
    expect(watchlistService.isInWatchlist('tt1234567')).toBeTrue();
    watchlistService.remove('tt1234567');
  });
});
