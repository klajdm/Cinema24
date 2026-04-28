import { TestBed } from '@angular/core/testing';
import { WatchlistService } from './watchlist.service';

describe('WatchlistService', () => {
  let service: WatchlistService;

  const movieA: any = { imdbID: 'tt0000001', Title: 'Movie A', Poster: 'N/A', Type: 'movie', Year: 2020 };
  const movieB: any = { imdbID: 'tt0000002', Title: 'Movie B', Poster: 'N/A', Type: 'series', Year: 2021 };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [WatchlistService] });
    service = TestBed.inject(WatchlistService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty watchlist', () => {
    service.watchlist$.subscribe((list) => {
      expect(list.length).toBe(0);
    });
  });

  describe('toggle', () => {
    it('should add a movie when not already in watchlist', () => {
      service.toggle(movieA);
      expect(service.isInWatchlist('tt0000001')).toBeTrue();
    });

    it('should remove a movie when already in watchlist', () => {
      service.toggle(movieA);
      service.toggle(movieA);
      expect(service.isInWatchlist('tt0000001')).toBeFalse();
    });

    it('should update the watchlist$ observable after add', () => {
      service.toggle(movieA);
      service.watchlist$.subscribe((list) => {
        expect(list.length).toBe(1);
        expect(list[0].imdbID).toBe('tt0000001');
      });
    });

    it('should update the watchlist$ observable after remove', () => {
      service.toggle(movieA);
      service.toggle(movieA);
      service.watchlist$.subscribe((list) => {
        expect(list.length).toBe(0);
      });
    });
  });

  describe('isInWatchlist', () => {
    it('should return false for a movie not in the list', () => {
      expect(service.isInWatchlist('tt9999999')).toBeFalse();
    });

    it('should return true for a movie that was added', () => {
      service.toggle(movieA);
      expect(service.isInWatchlist('tt0000001')).toBeTrue();
    });
  });

  describe('remove', () => {
    it('should remove the movie by imdbID', () => {
      service.toggle(movieA);
      service.remove('tt0000001');
      expect(service.isInWatchlist('tt0000001')).toBeFalse();
    });

    it('should not affect other movies when removing one', () => {
      service.toggle(movieA);
      service.toggle(movieB);
      service.remove('tt0000001');
      expect(service.isInWatchlist('tt0000002')).toBeTrue();
    });
  });

  describe('localStorage persistence', () => {
    it('should persist the watchlist to localStorage on add', () => {
      service.toggle(movieA);
      const stored = JSON.parse(localStorage.getItem('cinema24_watchlist') ?? '[]');
      expect(stored.length).toBe(1);
      expect(stored[0].imdbID).toBe('tt0000001');
    });

    it('should persist the watchlist to localStorage on remove', () => {
      service.toggle(movieA);
      service.remove('tt0000001');
      const stored = JSON.parse(localStorage.getItem('cinema24_watchlist') ?? '[]');
      expect(stored.length).toBe(0);
    });

    it('should load existing watchlist from localStorage on init', () => {
      localStorage.setItem('cinema24_watchlist', JSON.stringify([movieB]));
      const freshService = new WatchlistService();
      expect(freshService.isInWatchlist('tt0000002')).toBeTrue();
    });
  });

  describe('multiple items', () => {
    it('should handle multiple movies independently', () => {
      service.toggle(movieA);
      service.toggle(movieB);
      expect(service.isInWatchlist('tt0000001')).toBeTrue();
      expect(service.isInWatchlist('tt0000002')).toBeTrue();
    });

    it('watchlist$ should emit correct count for multiple items', () => {
      service.toggle(movieA);
      service.toggle(movieB);
      service.watchlist$.subscribe((list) => {
        expect(list.length).toBe(2);
      });
    });
  });
});
