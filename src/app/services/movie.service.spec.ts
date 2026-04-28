import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  const mockSearchResponse = {
    Search: [
      {
        imdbID: 'tt0000001',
        Title: 'Test Movie',
        Type: 'movie',
        Year: '2020',
        Poster: 'N/A',
      },
    ],
    totalResults: '1',
    Response: 'True',
  };

  const mockDetailResponse = {
    imdbID: 'tt0000001',
    Title: 'Test Movie',
    Genre: 'Action',
    Plot: 'A test plot.',
    imdbRating: '7.5',
    Response: 'True',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose featuredQueries with at least one entry', () => {
    expect(service.featuredQueries.length).toBeGreaterThan(0);
  });

  it('featuredQueries should all have label and query', () => {
    service.featuredQueries.forEach((q) => {
      expect(q.label).toBeTruthy();
      expect(q.query).toBeTruthy();
    });
  });

  describe('searchMovies', () => {
    it('should return empty Search for blank query without making HTTP call', () => {
      service.searchMovies('').subscribe((res) => {
        expect(res.Search).toEqual([]);
      });
      httpMock.expectNone(() => true);
    });

    it('should return empty Search for whitespace query without making HTTP call', () => {
      service.searchMovies('   ').subscribe((res) => {
        expect(res.Search).toEqual([]);
      });
      httpMock.expectNone(() => true);
    });

    it('should make GET request with query and page 1 by default', () => {
      service.searchMovies('batman').subscribe();
      const req = httpMock.expectOne(
        (r) =>
          r.url.includes('omdbapi.com') && r.urlWithParams.includes('s=batman'),
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.urlWithParams).toContain('s=batman');
      expect(req.request.urlWithParams).toContain('page=1');
      req.flush(mockSearchResponse);
    });

    it('should include type param when type is not all', () => {
      service.searchMovies('batman', 'movie').subscribe();
      const req = httpMock.expectOne((r) =>
        r.urlWithParams.includes('omdbapi.com'),
      );
      expect(req.request.urlWithParams).toContain('type=movie');
      req.flush(mockSearchResponse);
    });

    it('should NOT include type param when type is all', () => {
      service.searchMovies('batman', 'all').subscribe();
      const req = httpMock.expectOne((r) =>
        r.urlWithParams.includes('omdbapi.com'),
      );
      expect(req.request.urlWithParams).not.toContain('type=');
      req.flush(mockSearchResponse);
    });

    it('should include page param when page > 1', () => {
      service.searchMovies('batman', 'all', 3).subscribe();
      const req = httpMock.expectOne((r) =>
        r.urlWithParams.includes('omdbapi.com'),
      );
      expect(req.request.urlWithParams).toContain('page=3');
      req.flush(mockSearchResponse);
    });

    it('should return search results', () => {
      service.searchMovies('batman').subscribe((res) => {
        expect(res.Search.length).toBe(1);
        expect(res.Search[0].Title).toBe('Test Movie');
      });
      const req = httpMock.expectOne((r) =>
        r.urlWithParams.includes('omdbapi.com'),
      );
      req.flush(mockSearchResponse);
    });
  });

  describe('searchMoviesById', () => {
    it('should make GET request with imdbID', () => {
      service.searchMoviesById('tt0000001').subscribe();
      const req = httpMock.expectOne((r) =>
        r.urlWithParams.includes('omdbapi.com'),
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.urlWithParams).toContain('i=tt0000001');
      req.flush(mockDetailResponse);
    });

    it('should request full plot', () => {
      service.searchMoviesById('tt0000001').subscribe();
      const req = httpMock.expectOne((r) =>
        r.urlWithParams.includes('omdbapi.com'),
      );
      expect(req.request.urlWithParams).toContain('plot=full');
      req.flush(mockDetailResponse);
    });

    it('should return movie detail data', () => {
      service.searchMoviesById('tt0000001').subscribe((res: any) => {
        expect(res.Title).toBe('Test Movie');
        expect(res.imdbRating).toBe('7.5');
      });
      const req = httpMock.expectOne((r) =>
        r.urlWithParams.includes('omdbapi.com'),
      );
      req.flush(mockDetailResponse);
    });
  });
});
