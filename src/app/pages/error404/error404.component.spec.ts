import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { Error404Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule],
      declarations: [Error404Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the glitch headline', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.glitch')).not.toBeNull();
  });

  it('should contain a link to /home', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll('a');
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/home');
  });

  it('should contain a link to /watchlist', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = el.querySelectorAll('a');
    const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/watchlist');
  });
});
