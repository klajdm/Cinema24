import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared.module';
import { WatchlistService } from 'src/app/services/watchlist.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let watchlistService: WatchlistService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [WatchlistService],
    }).compileComponents();

    watchlistService = TestBed.inject(WatchlistService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with mobile menu closed', () => {
    expect(component.mobileMenuOpen).toBeFalse();
  });

  it('toggleMenu should open the mobile menu', () => {
    component.toggleMenu();
    expect(component.mobileMenuOpen).toBeTrue();
  });

  it('toggleMenu should close the mobile menu when already open', () => {
    component.mobileMenuOpen = true;
    component.toggleMenu();
    expect(component.mobileMenuOpen).toBeFalse();
  });

  it('should show 0 watchlist count initially', () => {
    expect(component.watchlistCount).toBe(0);
  });

  it('watchlistCount should update when item is added', () => {
    const movie: any = {
      imdbID: 'tt0000001',
      Title: 'Test',
      Poster: 'N/A',
      Type: 'movie',
      Year: 2020,
    };
    watchlistService.toggle(movie);
    expect(component.watchlistCount).toBe(1);
    watchlistService.remove('tt0000001');
  });

  it('should render the logo image', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('img')).not.toBeNull();
  });
});
