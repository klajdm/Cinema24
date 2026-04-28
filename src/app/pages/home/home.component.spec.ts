import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './home.component';
import { MovieService } from 'src/app/services/movie.service';
import { WatchlistService } from 'src/app/services/watchlist.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTooltipModule,
      ],
      declarations: [HomeComponent],
      providers: [MovieService, WatchlistService],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // ngOnInit fires immediately on createComponent; flush the initial category load
    fixture.detectChanges();
    const initReq = httpMock.expectOne((r) => r.url.includes('omdbapi.com'));
    initReq.flush({ Search: [], totalResults: '0' });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty movies array', () => {
    expect(component.movies).toEqual([]);
  });

  it('should set loading to false after initial category loads', () => {
    expect(component.loading).toBeFalse();
  });

  it('should default selectedType to all', () => {
    expect(component.selectedType).toBe('all');
  });

  it('should default activeCategory to Trending', () => {
    expect(component.activeCategory).toBe('Trending');
  });

  it('hasMore should be false when movies equals totalResults', () => {
    component.movies = [];
    component.totalResults = 0;
    expect(component.hasMore).toBeFalse();
  });

  it('hasMore should be true when movies are fewer than totalResults', () => {
    component.movies = [{ imdbID: 'tt1' } as any];
    component.totalResults = 5;
    expect(component.hasMore).toBeTrue();
  });

  it('onSearchInput should reset searchExecuted when term is empty', () => {
    component.searchExecuted = true;
    component.term = '';
    component.onSearchInput();
    const req2 = httpMock.expectOne((r) => r.url.includes('omdbapi.com'));
    req2.flush({ Search: [], totalResults: '0' });
    expect(component.searchExecuted).toBeFalse();
  });

  it('getPosterUrl should return placeholder for N/A', () => {
    expect(component.getPosterUrl('N/A')).toContain('placehold.co');
  });

  it('getPosterUrl should return the poster url when valid', () => {
    expect(component.getPosterUrl('https://example.com/poster.jpg')).toBe(
      'https://example.com/poster.jpg',
    );
  });
});
