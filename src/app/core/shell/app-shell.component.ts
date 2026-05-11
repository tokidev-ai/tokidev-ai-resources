import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app-shell.component.html',
  styles: `:host {
    display: block;
    min-height: 100vh;
    position: relative;
  }
  `,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class AppShellComponent {
  protected readonly compactNav = signal(false);

  protected onWindowScroll(): void {
    if (typeof globalThis.window === 'undefined') {
      return;
    }
    this.compactNav.set(globalThis.window.scrollY > 50);
  }
}
