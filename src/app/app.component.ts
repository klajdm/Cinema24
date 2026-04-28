import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate(
          '280ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ],
      { optional: true },
    ),
  ]),
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routeAnimations],
})
export class AppComponent {
  public title = 'cinema24';

  prepareRoute(outlet: RouterOutlet): string {
    return (
      outlet?.activatedRouteData?.['animation'] ??
      outlet?.activatedRoute?.snapshot?.url?.[0]?.path ??
      ''
    );
  }
}
