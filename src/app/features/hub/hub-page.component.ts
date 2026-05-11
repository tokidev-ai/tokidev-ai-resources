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
    if (f === 'todos') {
      return [...this.allResources];
    }
    return this.allResources.filter((r) => r.category === f);
  });

  protected setFilter(slug: HubFilterSlug): void {
    this.activeFilter.set(slug);
  }

  protected isActiveFilter(slug: HubFilterSlug): boolean {
    return this.activeFilter() === slug;
  }

  /** Utilidades Tailwind por categoría (glow tras blur). */
  protected glowAccentClass(cat: ResourceCategory): string {
    const map: Record<ResourceCategory, string> = {
      fundamentos: 'bg-cat-fundamentos',
      prompts: 'bg-cat-prompts',
      skills: 'bg-cat-skills',
      automatización: 'bg-cat-automatizacion',
      negocio: 'bg-cat-negocio',
      avanzado: 'bg-cat-avanzado',
    };
    return map[cat];
  }

  protected badgeTone(
    upcoming: boolean,
    category: ResourceCategory,
  ): string {
    const baseBadge =
      'inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.15em]';
    if (upcoming) {
      return `${baseBadge} border-brand-border bg-brand-purple/10 text-brand-text/50`;
    }
    switch (category) {
      case 'fundamentos':
        return `${baseBadge} border-brand-orange/15 bg-brand-orange/8 text-brand-orange/80`;
      case 'prompts':
        return `${baseBadge} border-brand-yellow/15 bg-brand-yellow/8 text-brand-yellow/80`;
      case 'skills':
        return `${baseBadge} border-brand-purple/15 bg-brand-purple/10 text-brand-purple/90`;
      case 'automatización':
        return `${baseBadge} border-cat-automatizacion/15 bg-cat-automatizacion/10 text-cat-automatizacion/90`;
      case 'negocio':
        return `${baseBadge} border-cat-negocio/15 bg-cat-negocio/10 text-cat-negocio/90`;
      default:
        return `${baseBadge} border-cat-avanzado/15 bg-cat-avanzado/10 text-cat-avanzado/90`;
    }
  }

  protected categoryLabel(cat: ResourceCategory): string {
    return cat.toUpperCase();
  }

  protected filterClasses(slug: HubFilterSlug): string {
    const active = this.isActiveFilter(slug);
    const base =
      'cursor-pointer rounded-full border px-5 py-2 text-[13px] font-semibold font-[inherit] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange';
    if (active) {
      return `${base} border-transparent bg-linear-to-r from-brand-orange to-brand-yellow text-white shadow-[0_8px_24px_-10px_rgb(239_108_74/0.45)]`;
    }
    return `${base} border-brand-border bg-surface-card text-brand-text/50 backdrop-blur-md hover:bg-brand-purple/10 hover:text-brand-text/70`;
  }
}
