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
import { MarkdownComponent } from 'ngx-markdown';
import type { ResourceStatLine } from '../../shared/models/hub.models';
import { resourceById } from '../../shared/data/hub-resources.data';
import { DesignGeneratorComponent } from '../design-generator/design-generator.component';

const DEFAULT_STATS: ResourceStatLine[] = [
  { icon: 'menu_book', value: '—', label: 'Detalle' },
  { icon: 'bolt', value: '—', label: 'En página' },
  { icon: 'public', value: 'Libre', label: 'Acceso libre' },
];

@Component({
  selector: 'app-resource-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MarkdownComponent, DesignGeneratorComponent],
  templateUrl: './resource-detail-page.component.html',
  host: {
    '(window:scroll)': 'onWindowScrollSpy()',
  },
})
export class ResourceDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

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

  protected readonly sections = computed(() =>
    this.detailResource()?.sections ?? [],
  );

  protected readonly markdownSrc = computed(() => {
    const r = this.detailResource();
    return r?.contentFile ? `docs/${r.contentFile}` : null;
  });

  protected readonly activeSectionId = signal<string>('');

  protected readonly mobileTocOpen = signal(false);

  constructor() {
    effect(() => {
      const ids = this.sections();
      if (ids.length > 0) this.activeSectionId.set(ids[0].id);
    });

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
    const sectionIds = this.sections().map((s) => s.id);
    if (!sectionIds.length) return;
    const scrollY = globalThis.window.scrollY + 200;
    let current = sectionIds[0];
    for (const id of sectionIds) {
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

  protected async downloadSkill(): Promise<void> {
    const url = this.detailResource()?.downloadUrl;
    if (!url) return;
    const res = await fetch(url);
    const raw = await res.text();
    const clean = raw
      .replace(/name:\s*carousel-tokidev/g, 'name: carousel-instagram')
      .replace(/Carrusel Instagram @tokidev\.(ia|ai)/gi, 'Carrusel Instagram')
      .replace(/carruseles de Instagram para @tokidev\.(ia|ai)/gi, 'carruseles de Instagram personalizados')
      .replace(/@tokidev\.(ia|ai)/gi, '@tu-cuenta');
    const blob = new Blob([clean], { type: 'text/markdown' });
    const a = globalThis.document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'SKILL.md';
    a.click();
    URL.revokeObjectURL(a.href);
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
