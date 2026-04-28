import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { WatchlistService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  watchlistCount = 0;
  scrolled = false;
  private sub!: Subscription;

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.sub = this.watchlistService.watchlist$.subscribe(
      (list) => (this.watchlistCount = list.length),
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu(): void {
    this.mobileMenuOpen = false;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 10;
  }
}
