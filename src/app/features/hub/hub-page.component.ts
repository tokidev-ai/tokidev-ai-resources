import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ResourceCategory } from '../../shared/models/hub.models';
import {
  RESOURCE_CARDS,
  RESOURCE_FILTERS,
  type HubFilterSlug,
} from '../../shared/data/hub-resources.data';

@Component({
  selector: 'app-hub-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './hub-page.component.html',
})
export class HubPageComponent {
  protected readonly filters = RESOURCE_FILTERS;
  protected readonly allResources = RESOURCE_CARDS;
  protected readonly activeFilter = signal<HubFilterSlug>('todos');

  protected readonly visibleResources = computed(() => {
    const f = this.activeFilter();
    return f === 'todos'
      ? [...this.allResources]
      : this.allResources.filter((r) => r.category === f);
  });

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
      ? `${base} border-transparent bg-linear-to-r from-brand-orange to-brand-yellow text-white shadow-[0_8px_24px_-10px_rgb(239_108_74/0.455)]`
      : `${base} border-brand-border bg-surface-card text-brand-text/50 backdrop-blur-md hover:bg-white/[0.06] hover:text-brand-text/70`;
  }
}
