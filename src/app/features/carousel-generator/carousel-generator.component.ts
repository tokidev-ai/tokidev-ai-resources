import { Component, inject, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ColorPreset {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent1: string;
  accent2: string;
}

interface CarouselStructure {
  id: 'listicle' | 'story' | 'tutorial';
  name: string;
  desc: string;
  slidesExample: string[];
}

interface TonePreset {
  id: 'direct' | 'educational' | 'inspirational';
  name: string;
  desc: string;
  rules: string;
}

@Component({
  selector: 'app-carousel-generator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carousel-generator.component.html',
})
export class CarouselGeneratorComponent {
  private readonly document = inject(DOCUMENT);

  // Preset Colors for Carousel Slides
  protected readonly colorPresets: ColorPreset[] = [
    {
      id: 'tokidev-dark',
      name: 'Tokidev Navy (Default)',
      bg: '#131139',
      text: '#ffffff',
      accent1: '#FA743F',
      accent2: '#A406E9',
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Purple',
      bg: '#0a0612',
      text: '#ffffff',
      accent1: '#ff007f',
      accent2: '#00f0ff',
    },
    {
      id: 'emerald',
      name: 'Emerald Deep',
      bg: '#020f08',
      text: '#f3f4f6',
      accent1: '#10b981',
      accent2: '#059669',
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      bg: '#030f26',
      text: '#edf2f4',
      accent1: '#06b6d4',
      accent2: '#3b82f6',
    },
    {
      id: 'minimal-light',
      name: 'Warm Light Minimal',
      bg: '#faf8f5',
      text: '#1f1e1c',
      accent1: '#ea580c',
      accent2: '#b45309',
    },
  ];

  // Carousel Structures
  protected readonly structures: CarouselStructure[] = [
    {
      id: 'listicle',
      name: 'Listado / Consejos (Listicle)',
      desc: 'Ideal para compartir listas de herramientas, tips o conceptos clave de forma rápida y visual.',
      slidesExample: [
        'Portada llamativa con número (ej. "5 herramientas...")',
        'Slide de transición: Conecta el problema y promete valor',
        'Slides de contenido: 1 tip o elemento por slide con tarjeta visual',
        'Slide final de CTA: Guarda el carrusel y sígueme',
      ],
    },
    {
      id: 'story',
      name: 'Caso de Estudio / Historia (Storytelling)',
      desc: 'Ideal para conectar a nivel personal y demostrar autoridad contando una experiencia o caso real.',
      slidesExample: [
        'Portada con gancho emocional o resultado (ej. "Cómo facturé...")',
        'El problema: La situación inicial y el dolor del cliente',
        'La solución: El método paso a paso utilizado para resolverlo',
        'El resultado + CTA: Métricas del éxito y llamada a comentar',
      ],
    },
    {
      id: 'tutorial',
      name: 'Tutorial Práctico (Paso a Paso)',
      desc: 'Ideal para guías prácticas de programación, configuración o metodologías detalladas.',
      slidesExample: [
        'Portada técnica y clara (ej. "Aprende a configurar...")',
        'Requisitos / Contexto inicial',
        'Pasos técnicos (Paso 1, Paso 2, Paso 3) con bloques de código o diagramas',
        'Resultado final y CTA: Pregunta dudas en comentarios',
      ],
    },
  ];

  // Tone Presets
  protected readonly tones: TonePreset[] = [
    {
      id: 'direct',
      name: 'Persuasivo y Directo',
      desc: 'Frases cortas, ganchos fuertes, comunicación de alto impacto sin rodeos.',
      rules: 'Usa frases punchy de menos de 10 palabras. Ve directo al grano. Rompe el patrón del scroll con ganchos agresivos en la portada. Utiliza verbos de acción directos.',
    },
    {
      id: 'educational',
      name: 'Educativo y Técnico',
      desc: 'Explicativo, estructurado, enfocado en el aprendizaje y la claridad técnica.',
      rules: 'Estructura clara y didáctica. Usa listas o viñetas cortas. Explica conceptos complejos de forma simple pero precisa. Prioriza la comprensión del lector.',
    },
    {
      id: 'inspirational',
      name: 'Inspirador y Cercano',
      desc: 'Storytelling personal, tono cercano y motivador para generar empatía y comunidad.',
      rules: 'Usa storytelling en primera persona. Conecta con las emociones y dolores comunes del desarrollador. Busca inspirar acción y fomentar la reflexión.',
    },
  ];

  // Component Signals
  protected readonly activeStep = signal<number>(1);
  protected readonly copied = signal<boolean>(false);

  // Configuration Signals
  protected readonly carouselTitle = signal<string>('Diseña tu Skill personalizada con IA');
  protected readonly slideCount = signal<number>(7);
  protected readonly selectedStructureId = signal<'listicle' | 'story' | 'tutorial'>('listicle');
  protected readonly selectedToneId = signal<'direct' | 'educational' | 'inspirational'>('direct');
  
  // Branding Signals
  protected readonly instagramHandle = signal<string>('@tu-cuenta');
  protected readonly brandWebsite = signal<string>('tu-marca.ai');

  // Color Signals
  protected readonly selectedPresetId = signal<string>('tokidev-dark');
  protected readonly colorBg = signal<string>('#131139');
  protected readonly colorText = signal<string>('#ffffff');
  protected readonly colorAccent1 = signal<string>('#FA743F');
  protected readonly colorAccent2 = signal<string>('#A406E9');

  // Preview Slide Navigation
  protected readonly activePreviewSlide = signal<number>(0);

  // Computeds
  protected readonly selectedStructure = computed(() => 
    this.structures.find(s => s.id === this.selectedStructureId())!
  );

  protected readonly selectedTone = computed(() => 
    this.tones.find(t => t.id === this.selectedToneId())!
  );

  // Build Name Slug (e.g. "carousel-tokidev-dark")
  private get nameSlug(): string {
    const handleClean = this.instagramHandle()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'custom';
    return `carousel-${handleClean}`;
  }

  // Compile the Markdown file content
  protected readonly skillMarkdown = computed(() => {
    const handle = this.instagramHandle() || '@tu-cuenta';
    const website = this.brandWebsite() || 'tu-marca.ai';
    const bg = this.colorBg();
    const text = this.colorText();
    const accent1 = this.colorAccent1();
    const accent2 = this.colorAccent2();
    const slides = this.slideCount();
    const structure = this.selectedStructure();
    const tone = this.selectedTone();
    const title = this.carouselTitle() || 'Diseño y desarrollo con IA';

    return `---
name: carousel-instagram
description: "Crear carruseles de Instagram en HTML con slides personalizados (1080x1350px), exportacion PNG. Personalizado para ${handle} con estilo de diseño propio, estructura ${structure.name} y tono ${tone.name}."
---

# Skill: Carrusel Instagram

Genera carruseles de Instagram en formato HTML listo para abrir en el navegador y exportar como PNG. Está optimizado con los estilos de marca de ${handle} y enfocado en el tema de referencia: **"${title}"**. Usa la plantilla bundled en \`assets/carousel-template.html\` como base, rellena con el contenido indicado por el usuario, y guarda el resultado como un nuevo archivo \`.html\` en la carpeta del proyecto.

---

## Flujo de trabajo

1. **Preguntar** cuántos slides quiere antes de generar (ver sección abajo)
2. **Leer** \`assets/carousel-template.html\` (la plantilla base con todos los estilos)
3. **Generar** los slides según la cantidad indicada, manteniendo siempre el slide 01 (portada) y el último como CTA final
4. **Guardar** como \`[tema]-slides.html\` en la carpeta de trabajo activa del usuario (workspace folder conectada en Cowork)
5. **Compartir** el link al archivo para que el usuario lo abra

---

## Cantidad de slides — SIEMPRE preguntar primero

Antes de generar cualquier carrusel, preguntarle al usuario cuántos slides quiere. El mínimo es 3 (portada + 1 contenido + CTA final). No hay máximo.

Ejemplo de pregunta:
> "¿Cuántos slides querés para este carrusel? El mínimo es 3. Por defecto son ${slides}, pero podés pedir los que necesites."

Si el usuario ya especificó la cantidad en su mensaje (ej. "hacé un carrusel de 10 slides"), no preguntar — usar ese número directamente.

### Cómo adaptar la cantidad

- **Slide 01** (portada) y **slide final** (CTA) son SIEMPRE fijos, independientemente del total
- Los slides de contenido del medio se agregan o quitan según la cantidad pedida
- El \`id\` de cada slide va en orden: \`slide-0\`, \`slide-1\`, ..., \`slide-N\`
- El slide CTA final siempre tiene el \`id\` del último (ej. para ${slides} slides: \`id="slide-${slides - 1}"\`)
- Actualizar la variable \`total\` en el JS: \`let cur = 0, total = ${slides};\`
- Actualizar el texto del botón export: \`⬇ Exportar ${slides} slides PNG\`
- El CSS de \`#slide-${slides - 1}\` (slide final) debe cambiarse al id correcto del último slide

### Ejemplo: carrusel de 10 slides

\`\`\`
slide-0  → Portada
slide-1  → Contenido 1
...
slide-9  → CTA Final (background: ${bg})
\`\`\`

CSS a ajustar:
\`\`\`css
#slide-9 { justify-content: flex-start; padding: 0; background: ${bg}; }
\`\`\`

JS a ajustar:
\`\`\`js
let cur = 0, total = 10;
\`\`\`

---

## Datos fijos — NUNCA cambiar

| Variable | Valor |
|---|---|
| Handle | \`${handle}\` |
| Formato | 1080 × 1350 px |
| Slides | Variable (preguntar al usuario, mínimo 3) |
| Idioma | Español rioplatense (voseo: "usás", "hacés") |
| Exportar | Botón PNG via html-to-image (jsDelivr CDN) |

---

## Paleta de colores

| Uso | Valor |
|---|---|
| Fondo body | \`${bg}\` |
| Fondo slide | \`${bg}\` |
| Fondo slide final (${slides < 10 ? '0' + slides : slides}) | \`${bg}\` |
| Overlay imagen | \`linear-gradient(to top, ${bg} 35%, rgba(19,17,57,0.55) 70%, rgba(19,17,57,0.3) 100%)\` |
| Acento degradado | \`linear-gradient(90deg, ${accent1} 0%, ${accent2} 100%)\` |
| Divider | \`linear-gradient(90deg, ${accent1}, ${accent2})\` |
| Texto principal | \`${text}\` |
| Texto desc/secundario | \`${text}8f\` |
| Texto cards | \`${text}70\` |
| Handle | \`${text}e0\` |

---

## Tipografía

| Clase CSS | Tamaño | Peso | Uso |
|---|---|---|---|
| \`.h-hero\` | \`clamp(104px,14vw,168px)\` | 900 | Título portada |
| \`.h-main\` | \`clamp(96px,13vw,156px)\` | 800 | Títulos slides 02–06 |
| \`.h-final\` | \`clamp(106px,14vw,172px)\` | 900 | Título CTA final |
| \`.desc-hero\` | \`clamp(32px,4vw,48px)\` | 400 | Descripción portada |
| \`.desc\` | \`clamp(33px,4.2vw,48px)\` | 400 | Descripción slides internos |
| \`.card h3\` | \`clamp(34px,4vw,50px)\` | 700 | Título card |
| \`.card p\` | \`clamp(26px,3vw,36px)\` | 400 | Texto card |

- Font: \`'Segoe UI', system-ui, -apple-system, sans-serif\`
- Letter-spacing títulos: \`-0.025em\` a \`-0.035em\`
- Line-height títulos: \`1.05\`–\`1.08\`

---

## Handle / Marca de agua

Siempre dentro del \`<div class="slide">\`, antes del contenido:
\`\`\`html
<div class="handle">${handle}</div>
\`\`\`
- Donde \`${handle}\` es el handle de Instagram configurado.
- Slides 02-06: \`font-size: 28px\` (definido en CSS global)
- Slide 01 portada: \`font-size: 40px\` (override \`#slide-0 .handle\`)
- Posición: \`top: 46px; right: 60px\`

---

## Label de producto (opcional por slide)

Aparece top-left en slides que lo necesitan. NO poner si el slide está muy cargado de contenido.

\`\`\`html
<div style="position: absolute; top: 52px; left: 60px; z-index: 5; display: flex; align-items: center; gap: 10px; pointer-events: none; white-space: nowrap;">
  <div style="width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(135deg, ${accent1}, ${accent2}); flex-shrink: 0;"></div>
  <span style="font-size: 22px; font-weight: 900; letter-spacing: -0.01em; color: rgba(255,255,255,0.85); white-space: nowrap;">
    ${website.split('.')[0]} <span style="background: linear-gradient(90deg, ${accent1}, ${accent2}); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">Digital</span>
  </span>
</div>
\`\`\`

---

## Componentes disponibles (ya en la plantilla CSS)

### 2 columnas de cards
\`\`\`html
<div class="cols">
  <div class="card">
    <div class="ico ico-orange sm"><svg viewBox="0 0 24 24">...</svg></div>
    <h3>Título</h3>
    <p>Descripción</p>
  </div>
  <div class="card">...</div>
</div>
\`\`\`

### 3 columnas
\`\`\`html
<div class="cols-3">
  <div class="card">...</div>
</div>
\`\`\`

### Pills (tags)
\`\`\`html
<div class="pills">
  <div class="pill blue">Texto</div>
  <div class="pill purple">Texto</div>
  <div class="pill green">Texto</div>
</div>
\`\`\`

### Números grandes
\`\`\`html
<div class="bcard hi">
  <div class="bnum">95%</div>
  <div class="blabel">Descripción corta</div>
</div>
\`\`\`

### Divider decorativo
\`\`\`html
<div class="divider"></div>
\`\`\`

### Colores de iconos
\`ico-blue\` | \`ico-purple\` | \`ico-orange\` | \`ico-green\` | \`ico-teal\` | \`ico-pink\`
Tamaños: \`.ico\` (normal) | \`.ico.sm\` (pequeño) | \`.ico.xl\` (grande)

---

## Estructura de cada slide

### Slide 01 - Portada
- \`id="slide-0"\`, \`class="slide active"\`
- Layout: \`justify-content: flex-end\` (contenido abajo-izquierda)
- Título con \`.h-hero\` + \`.accent\` en la parte más impactante
- Descripción: \`.desc-hero\`, max-width 680px
- Imagen de fondo opcional: usar patrón de overlay (ver sección abajo) - NO usar \`mask-image\`

### Slides 02-06 - Contenido
- \`id="slide-1"\` a \`id="slide-5"\`, \`class="slide"\`
- Layout: \`justify-content: flex-end\`, padding \`52px 60px 64px\`
- Siempre incluir \`<div class="glow"></div>\` para el halo superior

### Slide 07 - CTA Final
- \`id="slide-6"\`, \`class="slide"\`, \`background: ${bg}\`
- Estructura FIJA - no modificar el layout:
  - \`.final-top\`: pregunta principal + subtítulo motivador
  - \`.final-bar\`: "Seguinos para más contenido" + el handle del usuario (\`${handle}\`) + iconos GUARDA/COMPARTE/COMENTA
- Sin badges de número, sin emojis decorativos

---

## Reglas de contenido y Redacción Personalizada

- **Tema de referencia por defecto**: Centrar el carrusel en torno al tema **"${title}"** (aunque el usuario puede solicitar variaciones o nuevos temas durante el chat).
- **Estructura Narrativa a Seguir**: ${structure.name}
${structure.slidesExample.map((step, idx) => `  - **Slide 0${idx + 1}**: ${step}`).join('\n')}
- **Tono de Voz**: ${tone.name}
  - ${tone.rules}
- **Sin badges** de número de slide (ej. "04 / 07") - eliminados definitivamente
- **Sin emojis** decorativos en slide final
- **Acento** (degradado de color) siempre en la palabra/frase más impactante del título
- **Máximo 2 cards** por slide en layout de 2 columnas para que respiren
- Imágenes de producto: siempre con overlay encima para legibilidad
- Slide 01: pregunta directa o dato fuerte que genere curiosidad
- \`white-space: nowrap\` en textos del label de producto y follow-label para evitar que se partan en 2 líneas al exportar

---

## Imagen de fondo portada (slide 01) - patrón con overlay

**IMPORTANTE:** NO usar \`mask-image\` - no es compatible con exportadores de PNG.
En su lugar, usar dos divs: la imagen sin máscara + un overlay gradient encima que simula el fade.

\`\`\`html
<!-- Imagen esquina derecha con fade lateral - compatible con export PNG -->
<div style="position: absolute; right: 0; top: 0; width: 780px; height: 1350px; z-index: 1; pointer-events: none; overflow: hidden;">
  <!-- Imagen sin máscara -->
  <div style="width: 100%; height: 100%;
    background: url('URL_IMAGEN') center top/cover no-repeat;">
  </div>
  <!-- Overlay que simula el fade (reemplaza mask-image) -->
  <div style="position: absolute; inset: 0;
    background: linear-gradient(to right,
      ${bg} 0%, ${bg} 2%,
      rgba(19,17,57,0.92) 12%,
      rgba(19,17,57,0.65) 30%,
      rgba(19,17,57,0.25) 55%,
      transparent 80%, transparent 100%);">
  </div>
</div>
<div style="position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 40%, rgba(19,17,57,0) 0%, rgba(19,17,57,0.55) 55%, ${bg} 80%); z-index: 2; pointer-events: none;"></div>
\`\`\`

---

## Exportación (ya configurada en la plantilla)

- **Librería:** \`html-to-image\` desde jsDelivr CDN
  - \`https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js\`
- **Por qué html-to-image en vez de dom-to-image o html2canvas:**
  - Soporta \`-webkit-background-clip: text\`   texto degradado correcto en PNG
  - Soporta overlays, radial-gradient y CSS moderno
  - Maneja imágenes externas (Cloudinary) via fetch con CORS
- Resolución: 1080 × 1350 px exactos (\`pixelRatio: 1\`)
- Nombre archivos: \`[tema]-slide-01.png\` ... \`[tema]-slide-07.png\`
- UI (flechas, nav, contador, botón export) se excluyen con \`filter\` durante export
- El handle del usuario SÍ aparece en el export (está dentro del slide)

---

## Escala en pantalla

\`\`\`js
const s = Math.min(window.innerWidth / 1080, window.innerHeight / 1350);
wrapper.style.transform = \`scale(\${s})\`;
\`\`\`
`;
  });

  // Apply a color preset
  protected applyPreset(preset: ColorPreset): void {
    this.selectedPresetId.set(preset.id);
    this.colorBg.set(preset.bg);
    this.colorText.set(preset.text);
    this.colorAccent1.set(preset.accent1);
    this.colorAccent2.set(preset.accent2);
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

  // Slide navigation in preview
  protected prevPreviewSlide(): void {
    if (this.activePreviewSlide() > 0) {
      this.activePreviewSlide.update((s) => s - 1);
    } else {
      this.activePreviewSlide.set(3); // loop to end
    }
  }

  protected nextPreviewSlide(): void {
    if (this.activePreviewSlide() < 3) {
      this.activePreviewSlide.update((s) => s + 1);
    } else {
      this.activePreviewSlide.set(0); // loop to start
    }
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
}
