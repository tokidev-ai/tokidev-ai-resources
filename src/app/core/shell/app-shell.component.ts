import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: './app-shell.component.html',
  styles: `:host {
    display: block;
    min-height: 100vh;
    position: relative;
  }
  `,
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class AppShellComponent {
  protected readonly scrolled = signal(false);

  protected onScroll(): void {
    if (typeof globalThis.window === 'undefined') return;
    this.scrolled.set(globalThis.window.scrollY > 20);
  }
}
