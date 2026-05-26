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
  .scrolled-nav {
    border-radius: 1rem;
    border-color: var(--color-brand-border-nav);
    background-color: var(--color-surface-nav);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    padding: 0.75rem 1.25rem;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
  }
  `,
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class AppShellComponent {
  public readonly scrolled = signal(false);

  public onScroll(): void {
    if (typeof globalThis.window === 'undefined') return;
    this.scrolled.set(globalThis.window.scrollY > 20);
  }
}
