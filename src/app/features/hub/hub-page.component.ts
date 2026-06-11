import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ResourceCategory } from '../../shared/models/hub.models';
import {
  RESOURCE_CARDS,
  RESOURCE_FILTERS,
  type HubFilterSlug,
} from '../../shared/data/hub-resources.data';
import gsap from 'gsap';

@Component({
  selector: 'app-hub-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './hub-page.component.html',
  styles: `
    @keyframes scroll-bounce {
      0%, 100% { transform: translateY(0);   opacity: 0.3; }
      50%       { transform: translateY(6px); opacity: 0.7; }
    }
    @keyframes card-float {
      0%, 100% { transform: rotate(2deg) translateY(0px); }
      50%       { transform: rotate(2deg) translateY(-10px); }
    }
    @keyframes card-float-slow {
      0%, 100% { transform: rotate(-6deg) translateY(0px); }
      50%       { transform: rotate(-6deg) translateY(-14px); }
    }
    @keyframes chip-float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-6px); }
    }
    @keyframes chip-float-slow {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }
    .scroll-bounce    { animation: scroll-bounce 2s ease-in-out infinite; }
    .card-float       { animation: card-float 5s ease-in-out infinite; }
    .card-float-slow  { animation: card-float-slow 7s ease-in-out infinite; }
    .chip-float       { animation: chip-float 4s ease-in-out infinite; }
    .chip-float-slow  { animation: chip-float-slow 6s ease-in-out infinite; }

    .hero-spotlight {
      background: radial-gradient(
        700px circle at var(--mx, 65%) var(--my, 50%),
        rgb(239 108 74 / 0.11),
        transparent 50%
      );
    }
  `,
  host: {
    '(mousemove)': 'onMouseMove($event)',
  },
})
export class HubPageComponent {
  private readonly el = inject(ElementRef);

  protected readonly filters = RESOURCE_FILTERS;
  protected readonly allResources = RESOURCE_CARDS;
  protected readonly activeFilter = signal<HubFilterSlug>('todos');

  protected readonly visibleResources = computed(() => {
    const f = this.activeFilter();
    return f === 'todos'
      ? [...this.allResources]
      : this.allResources.filter((r) => r.category === f);
  });

  constructor() {
    afterNextRender(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-line1',  { opacity: 0, y: 60, duration: 0.8 })
        .from('.hero-line2',  { opacity: 0, y: 60, duration: 0.8 }, '-=0.55')
        .from('.hero-sub',    { opacity: 0, y: 24, duration: 0.7 }, '-=0.4')
        .from('.hero-cta',    { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
        .from('.hero-cue',    { opacity: 0, duration: 0.5 },        '-=0.2')
        .from('.hero-cards',  { opacity: 0, x: 40, duration: 1.0, ease: 'power3.out' }, 0.3);
    });
  }

  protected scrollToResources(): void {
    const el =
      typeof globalThis.document === 'undefined'
        ? undefined
        : globalThis.document.getElementById('biblioteca');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected onMouseMove(e: MouseEvent): void {
    const hero = this.el.nativeElement.querySelector('.hero-section') as HTMLElement | null;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--mx', `${x}%`);
    hero.style.setProperty('--my', `${y}%`);
  }

  protected setFilter(slug: HubFilterSlug): void {
    this.activeFilter.set(slug);
  }

  protected isActiveFilter(slug: HubFilterSlug): boolean {
    return this.activeFilter() === slug;
  }

  protected glowAccentClass(cat: ResourceCategory, id?: number): string {
    if (id === 10) return 'bg-brand-orange';
    const map: Record<ResourceCategory, string> = {
      prompts: 'bg-cat-prompts',
      skills: 'bg-cat-skills',
      automatización: 'bg-cat-automatizacion',
    };
    return map[cat];
  }

  protected badgeTone(upcoming: boolean, category: ResourceCategory, id?: number): string {
    const base =
      'inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.15em]';
    if (upcoming) return `${base} border-brand-border bg-white/[0.04] text-brand-text/50`;
    if (id === 10) {
      return `${base} border-brand-orange/15 bg-brand-orange/8 text-brand-orange/80`;
    }
    switch (category) {
      case 'prompts':
        return `${base} border-brand-yellow/15 bg-brand-yellow/8 text-brand-yellow/80`;
      case 'skills':
        return `${base} border-brand-purple/15 bg-brand-purple/10 text-brand-purple/90`;
      default:
        return `${base} border-cat-automatizacion/15 bg-cat-automatizacion/10 text-cat-automatizacion/90`;
    }
  }

  protected categoryLabel(cat: ResourceCategory): string {
    return cat.toUpperCase();
  }

  protected filterClasses(slug: HubFilterSlug): string {
    const active = this.isActiveFilter(slug);
    const base =
      'cursor-pointer rounded-full border px-5 py-2 text-[13px] font-semibold font-[inherit] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange';
    return active
      ? `${base} border-transparent bg-linear-to-r from-brand-orange to-brand-yellow text-white shadow-[0_8px_24px_-10px_rgb(239_108_74/0.45)]`
      : `${base} border-brand-border bg-surface-card text-brand-text/50 backdrop-blur-md hover:bg-white/[0.06] hover:text-brand-text/70`;
  }
}
