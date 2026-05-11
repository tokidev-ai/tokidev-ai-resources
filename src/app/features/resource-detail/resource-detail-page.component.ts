import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import type { DetailSectionDef, ResourceStatLine } from '../../shared/models/hub.models';
import {
  CAROUSEL_SAMPLE_SECTIONS,
  resourceById,
} from '../../shared/data/hub-resources.data';

const DEFAULT_STATS: ResourceStatLine[] = [
  { value: '📚 —', label: 'Detalle' },
  { value: '⚡ —', label: 'En página' },
  { value: '🌐 Libre', label: 'tokidev' },
];

const SECTION_IDS = CAROUSEL_SAMPLE_SECTIONS.map((s) => s.id);

const EXAMPLE_CAROUSEL_OUTPUT = [
  'SLIDE 1: EL HOOK',
  'TÍTULO: Deja de escribir prompts mediocres.',
  'SUBTÍTULO: El framework de 3 pasos que usa el 1%...',
].join('\n');

@Component({
  selector: 'app-resource-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './resource-detail-page.component.html',
  host: {
    '(window:scroll)': 'onWindowScrollSpy()',
  },
})
export class ResourceDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /** Structured sections mirror the prototype; content is authored in Angular templates (no unsafe HTML). */
  protected readonly sections: readonly DetailSectionDef[] =
    CAROUSEL_SAMPLE_SECTIONS;

  readonly exampleCarouselOutput = EXAMPLE_CAROUSEL_OUTPUT;

  private readonly paramSlug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') },
  );

  protected readonly detailResource = computed(() => {
    const raw = this.paramSlug();
    if (raw == null) return undefined;
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1) return undefined;
    return resourceById(n);
  });

  protected readonly statRows = computed(() => {
    const r = this.detailResource();
    return r?.detailStats ?? DEFAULT_STATS;
  });

  /** Active section highlighting in TOC (scroll-aligned with prototype thresholds). */
  protected readonly activeSectionId = signal<string>(SECTION_IDS[0]);

  protected readonly mobileTocOpen = signal(false);

  constructor() {
    effect(() => {
      const slug = this.paramSlug();
      if (slug === null) return;
      const r = this.detailResource();
      if (!r || r.upcoming) void this.router.navigate(['/recursos']);
    });
  }

  protected badgeLabel(category: string): string {
    return category.toUpperCase();
  }

  protected scrollTo(sectionId: string): void {
    const el =
      typeof globalThis.document === 'undefined'
        ? undefined
        : globalThis.document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.activeSectionId.set(sectionId);
    this.mobileTocOpen.set(false);
  }

  protected onWindowScrollSpy(): void {
    if (
      typeof globalThis.window === 'undefined' ||
      typeof globalThis.document === 'undefined'
    ) {
      return;
    }
    const scrollY = globalThis.window.scrollY + 200;
    let current = SECTION_IDS[0];
    for (const id of SECTION_IDS) {
      const sec = globalThis.document.getElementById(id);
      if (sec && sec.offsetTop <= scrollY) {
        current = id;
      }
    }
    if (current !== this.activeSectionId()) {
      this.activeSectionId.set(current);
    }
  }

  protected toggleMobileToc(): void {
    this.mobileTocOpen.update((open) => !open);
  }

  protected tocBtnClass(sectionId: string): string {
    const on = this.activeSectionId() === sectionId;
    return (
      'mb-3 block w-full cursor-pointer border-0 border-s-2 bg-transparent py-1 ps-3 text-start text-[13px] font-[inherit] transition-colors hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-orange ' +
      (on
        ? 'border-brand-orange text-brand-orange'
        : 'border-transparent text-brand-text/50')
    );
  }
}
