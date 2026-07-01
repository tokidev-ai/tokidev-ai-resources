import { Component, inject, signal, computed, effect } from '@angular/core';
import { DOCUMENT, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ColorPreset {
  id: string;
  name: string;
  bg: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  glass: string;
}

interface FontPairing {
  id: string;
  name: string;
  heading: string;
  body: string;
}

@Component({
  selector: 'app-design-generator',
  standalone: true,
  imports: [FormsModule, LowerCasePipe],
  templateUrl: './design-generator.component.html',
  styleUrls: [], // styles will be defined inline in html template or css classes
})
export class DesignGeneratorComponent {
  private readonly document = inject(DOCUMENT);

  // Define Preset Color Palettes
  protected readonly presets: ColorPreset[] = [
    {
      id: 'tokidev',
      name: 'Tokidev Premium',
      bg: '#080311',
      text: '#f0eef2',
      primary: '#FA743F',
      secondary: '#DA2984',
      border: 'rgba(164, 6, 233, 0.15)',
      glass: 'rgba(18, 10, 32, 0.65)',
    },
    {
      id: 'emerald',
      name: 'Midnight Emerald',
      bg: '#080e0c',
      text: '#f3f4f6',
      primary: '#10b981',
      secondary: '#34d399',
      border: 'rgba(16, 185, 129, 0.15)',
      glass: 'rgba(8, 20, 16, 0.65)',
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon',
      bg: '#0b0914',
      text: '#fafafa',
      primary: '#ff007f',
      secondary: '#00f0ff',
      border: 'rgba(255, 0, 127, 0.15)',
      glass: 'rgba(18, 11, 35, 0.65)',
    },
    {
      id: 'warm-paper',
      name: 'Warm Paper',
      bg: '#fbfaf7',
      text: '#1e293b',
      primary: '#c2410c',
      secondary: '#854d0e',
      border: 'rgba(194, 65, 12, 0.12)',
      glass: 'rgba(247, 245, 240, 0.8)',
    },
    {
      id: 'amethyst',
      name: 'Royal Amethyst',
      bg: '#0d081b',
      text: '#f5f3ff',
      primary: '#a855f7',
      secondary: '#ec4899',
      border: 'rgba(168, 85, 247, 0.15)',
      glass: 'rgba(23, 14, 46, 0.65)',
    },
    {
      id: 'frost',
      name: 'Nordic Frost',
      bg: '#0b132b',
      text: '#edf2f4',
      primary: '#38bdf8',
      secondary: '#818cf8',
      border: 'rgba(56, 189, 248, 0.15)',
      glass: 'rgba(19, 29, 58, 0.65)',
    },
  ];

  // Define Preset Typography Pairs
  protected readonly typographyPairs: FontPairing[] = [
    {
      id: 'clean-sans',
      name: 'Modern Sans (Tech & Clean)',
      heading: 'Inter',
      body: 'Inter',
    },
    {
      id: 'elegant-serif',
      name: 'Elegant Serif (Luxury & Editorial)',
      heading: 'Cormorant Garamond',
      body: 'Instrument Sans',
    },
    {
      id: 'sleek-display',
      name: 'Sleek Display (Modern Brand)',
      heading: 'Outfit',
      body: 'Inter',
    },
    {
      id: 'geometric-tech',
      name: 'Geometric Space (Futuristic)',
      heading: 'Space Grotesk',
      body: 'Plus Jakarta Sans',
    },
  ];

  // Component Signals
  protected readonly brandName = signal<string>('MiProyecto');
  protected readonly selectedPresetId = signal<string>('tokidev');
  protected readonly colorBg = signal<string>('#080311');
  protected readonly colorText = signal<string>('#f0eef2');
  protected readonly colorPrimary = signal<string>('#FA743F');
  protected readonly colorSecondary = signal<string>('#DA2984');
  protected readonly colorBorder = signal<string>('rgba(164, 6, 233, 0.15)');
  protected readonly colorGlass = signal<string>('rgba(18, 10, 32, 0.65)');

  protected readonly selectedFontPairId = signal<string>('clean-sans');
  protected readonly fontHeading = signal<string>('Inter');
  protected readonly fontBody = signal<string>('Inter');

  protected readonly activeStep = signal<number>(1);
  protected readonly copied = signal<boolean>(false);

  constructor() {
    // Dynamic Font Loading Effect
    effect(() => {
      const heading = this.fontHeading();
      const body = this.fontBody();
      if (typeof globalThis.window === 'undefined') return;

      const linkId = 'dynamic-google-fonts';
      let link = this.document.getElementById(linkId) as HTMLLinkElement | null;
      if (!link) {
        link = this.document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        this.document.head.appendChild(link);
      }

      const families = Array.from(new Set([heading, body])).map(
        (f) => `${f.replace(/ /g, '+')}:wght@400;500;600;700`,
      );
      link.href = `https://fonts.googleapis.com/css2?family=${families.join('&family=')}&display=swap`;
    });
  }

  // Set preset colors
  protected applyPreset(preset: ColorPreset): void {
    this.selectedPresetId.set(preset.id);
    this.colorBg.set(preset.bg);
    this.colorText.set(preset.text);
    this.colorPrimary.set(preset.primary);
    this.colorSecondary.set(preset.secondary);
    this.colorBorder.set(preset.border);
    this.colorGlass.set(preset.glass);
  }

  // Set font pair
  protected applyFontPair(pair: FontPairing): void {
    this.selectedFontPairId.set(pair.id);
    this.fontHeading.set(pair.heading);
    this.fontBody.set(pair.body);
  }

  // Build Name Slug (e.g. "my-project")
  private get nameSlug(): string {
    return this.brandName()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'custom';
  }

  // Compile the Markdown file content
  protected readonly skillMarkdown = computed(() => {
    const name = this.brandName() || 'Custom';
    const slug = this.nameSlug;
    const bg = this.colorBg();
    const text = this.colorText();
    const primary = this.colorPrimary();
    const secondary = this.colorSecondary();
    const border = this.colorBorder();
    const glass = this.colorGlass();
    const fHead = this.fontHeading();
    const fBody = this.fontBody();

    return `---
name: ${slug}-design-system
description: Apply the ${name} design system (${primary}, ${secondary}, glassmorphism) to any web project. Triggers for "${slug} style", "${slug} design", "use ${slug} colors", "landing page like ${slug}", "glassmorphism nav", or "dark portfolio design".
---

# ${name} Design System

A premium design system custom-tailored for **${name}**. Use it to apply a consistent, polished look across any web project.

## Core Philosophy

The ${name} aesthetic is built on three pillars:
1. **Elegant dark base** — main background is \`${bg}\` for a premium, high-contrast digital stage.
2. **Dynamic accent gradients** — primary accent \`${primary}\` and secondary accent \`${secondary}\` blended into smooth gradients for focal elements.
3. **Glassmorphism depth** — frosted glass cards and navigation panels with soft backgrounds (\`${glass}\`) and subtle borders (\`${border}\`).

Restraint is key: most content should use text color \`${text}\` on the background \`${bg}\`. The accent gradients are reserved for important display headings and primary calls-to-action (CTAs).

---

## Quick Setup

### CSS Custom Properties
\`\`\`css
:root {
  /* Brand Colors */
  --brand-bg:      ${bg};
  --brand-text:    ${text};
  --brand-primary: ${primary};
  --brand-secondary: ${secondary};
  --brand-border:  ${border};
  --brand-glass:   ${glass};

  /* Typography */
  --font-heading: '${fHead}', sans-serif;
  --font-body:    '${fBody}', sans-serif;
}

body {
  background-color: var(--brand-bg);
  color: var(--brand-text);
  font-family: var(--font-body);
}
\`\`\`

### Tailwind CSS Config Extension
\`\`\`js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-bg':        '${bg}',
        'brand-text':      '${text}',
        'brand-primary':   '${primary}',
        'brand-secondary': '${secondary}',
        'brand-border':    '${border}',
        'brand-glass':     '${glass}',
      },
      fontFamily: {
        heading: ['${fHead}', 'sans-serif'],
        body:    ['${fBody}', 'sans-serif'],
      },
    },
  },
}
\`\`\`

---

## Typography System

### H1 — Hero Heading (Vertical Gradient)
\`\`\`css
h1 {
  font-family: var(--font-heading);
  font-size: clamp(34px, 5vw, 60px);
  font-weight: 700;
  line-height: 1.1;
  background: linear-gradient(to bottom, #ffffff 50%, var(--brand-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
\`\`\`

### H2 — Section Heading (Horizontal Gradient)
\`\`\`css
h2 {
  font-family: var(--font-heading);
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 700;
  background: linear-gradient(to right, var(--brand-text) 55%, var(--brand-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
\`\`\`

---

## Component Recipes

### Glassmorphic Navigation Bar
\`\`\`html
<nav class="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[1120px] h-16
            bg-[var(--brand-glass)] backdrop-blur-xl border border-[var(--brand-border)]
            rounded-2xl px-6 flex items-center justify-between">
  <!-- Brand logo + Links + CTA -->
</nav>
\`\`\`

### Primary CTA Button (Accent Gradient)
\`\`\`html
<a href="#cta" class="px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary
                      rounded-full text-[13px] font-semibold text-white
                      hover:opacity-90 transition-opacity">
  Get Started
</a>
\`\`\`

### Glassmorphic Card
\`\`\`html
<div class="bg-[var(--brand-glass)] backdrop-blur-md border border-[var(--brand-border)]
            rounded-2xl p-6 shadow-lg">
  <!-- Card contents -->
</div>
\`\`\`

---

## Implementation Notes
- **Fonts**: Make sure to preconnect and import **${fHead}** and **${fBody}** from Google Fonts.
- **Glassmorphism**: Keep backdrop filter blur values high (e.g. 15px to 24px) to retain the frosted appearance over glow overlays.
- **Ambient Glows**: Place radial blurs behind content cards to give the dark page depth:
  \`\`\`html
  <div class="absolute w-[400px] h-[400px] rounded-full bg-brand-primary/10 blur-[130px] pointer-events-none"></div>
  \`\`\`
`;
  });

  // Download the SKILL.md file
  protected downloadSkill(): void {
    const text = this.skillMarkdown();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = this.document.createElement('a');
    a.href = url;
    a.download = `SKILL-${this.nameSlug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Copy to clipboard
  protected async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.skillMarkdown());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  }

  // Wizard navigation
  protected prevStep(): void {
    if (this.activeStep() > 1) {
      this.activeStep.update((s) => s - 1);
    }
  }

  protected nextStep(): void {
    if (this.activeStep() < 4) {
      this.activeStep.update((s) => s + 1);
    }
  }

  protected setStep(step: number): void {
    this.activeStep.set(step);
  }
}
