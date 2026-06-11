import type { ResourceCard } from '../models/hub.models';

export type HubFilterSlug =
  | 'todos'
  | 'prompts'
  | 'skills'
  | 'automatización';

export const RESOURCE_FILTERS = [
  { slug: 'todos' as const, label: 'Todos' },
  { slug: 'prompts' as const, label: 'Prompts' },
  { slug: 'skills' as const, label: 'Skills' },
  { slug: 'automatización' as const, label: 'Automatización' },
] satisfies ReadonlyArray<{ slug: HubFilterSlug; label: string }>;

const GITHUB_RAW = 'https://raw.githubusercontent.com/tokidev-ai/tokidev-skills/main';

export const RESOURCE_CARDS = [
  {
    id: 4,
    num: '01',
    category: 'prompts',
    title: 'El PRD antes de buildear',
    desc: '1 prompt + 1 template + 3 reglas. El filtro que te ahorra construir lo que no sirve.',
    meta: '· 1 prompt · 1 template',
    cta: 'Leer',
    upcoming: false,
    detailStats: [
      { icon: 'edit_note', value: '1 prompt', label: '+ template vivo' },
      { icon: 'rule', value: '3 reglas', label: 'Filtro de scope' },
      { icon: 'bolt', value: 'Rápido', label: 'Antes del build' },
    ],
    sections: [
      { id: 'que-es', label: 'QUÉ ES', num: '01', title: 'El filtro antes de escribir código' },
      { id: 'el-prompt', label: 'EL PROMPT', num: '02', title: 'Cómo usarlo en Claude' },
      { id: 'las-reglas', label: 'LAS 3 REGLAS', num: '03', title: 'Las 3 reglas del PRD mínimo' },
      { id: 'template', label: 'TEMPLATE', num: '04', title: 'El template listo para copiar' },
    ],
    contentFile: 'prd-antes-de-buildear.md',
  },
  {
    id: 3,
    num: '02',
    category: 'skills',
    title: 'Crea slides de Instagram listos para subir',
    desc: 'De prompt a PNG en minutos. Diseño, colores y estructura incluidos — solo escribís el tema.',
    meta: '· HTML · exportación PNG',
    cta: 'Leer',
    upcoming: false,
    detailBadgeLabel: 'INSTAGRAM · 1080×1350px',
    detailStats: [
      { icon: 'image', value: '1080×1350', label: 'Resolución exacta' },
      { icon: 'palette', value: 'Sistema', label: 'de diseño completo' },
      { icon: 'download', value: 'PNG', label: 'Exportación directa' },
    ],
    sections: [
      { id: 'que-es', label: 'QUÉ HACE', num: '01', title: 'Qué genera la skill' },
      { id: 'instalacion', label: 'INSTALACIÓN', num: '02', title: 'Cómo instalarla en Claude' },
      { id: 'como-usarla', label: 'CÓMO USARLA', num: '03', title: 'Flujo de trabajo' },
      { id: 'diseno', label: 'DISEÑO', num: '04', title: 'Sistema de diseño incluido' },
    ],
    contentFile: 'carousel-tokidev.md',
    downloadUrl: `${GITHUB_RAW}/carousel-instagram/SKILL.md`,
    skillSlug: 'carousel-instagram',
  },
  {
    id: 9,
    num: '03',
    category: 'skills',
    title: 'Tu LinkedIn atrae trabajo o lo espanta',
    desc: 'Skill que audita tu perfil como developer: 10 aspectos, estado real y mejoras concretas con ejemplos.',
    meta: '· auditoría',
    cta: 'Leer',
    upcoming: false,
    detailBadgeLabel: 'LINKEDIN · DEVELOPERS',
    detailStats: [
      { icon: 'person_search', value: '10 aspectos', label: 'auditados con estado' },
      { icon: 'tips_and_updates', value: 'Concreto', label: 'Mejoras con ejemplos' },
      { icon: 'travel_explore', value: 'Chrome', label: 'o modo chat' },
    ],
    sections: [
      { id: 'que-es', label: 'QUÉ HACE', num: '01', title: 'Qué analiza la skill' },
      { id: 'instalacion', label: 'INSTALACIÓN', num: '02', title: 'Cómo instalarla en Claude' },
      { id: 'como-usarla', label: 'CÓMO USARLA', num: '03', title: 'Con Chrome y sin navegador' },
      { id: 'los-10', label: 'LOS 10 ASPECTOS', num: '04', title: 'Todo lo que revisa' },
    ],
    contentFile: 'linkedin-skill.md',
    downloadUrl: `${GITHUB_RAW}/linkedin-dev-auditor/SKILL.md`,
    skillSlug: 'linkedin-dev-auditor',
  },
  {
    id: 10,
    num: '04',
    category: 'skills',
    title: 'Diseña tu landing premium sin parecer template',
    desc: 'Crea tu propia skill de diseño con tus colores y tipografías. Elige tu paleta, previsualízala y exporta el prompt listo para usar.',
    meta: '· interactivo',
    cta: 'Crear',
    upcoming: false,
    detailBadgeLabel: 'DISEÑO · PERSONALIZADO',
    detailStats: [
      { icon: 'palette', value: 'Personalizado', label: 'Colores y marcas' },
      { icon: 'text_fields', value: '4 tipografías', label: 'Pares tipográficos' },
      { icon: 'download', value: 'SKILL.md', label: 'Exportación directa' },
    ],
    sections: [
      { id: 'colores', label: 'COLORES', num: '01', title: 'Configura la paleta de colores' },
      { id: 'tipografia', label: 'TIPOGRAFÍA', num: '02', title: 'Selecciona la tipografía' },
      { id: 'comparacion', label: 'COMPARACIÓN', num: '03', title: 'Antes vs Después' },
      { id: 'exportar', label: 'EXPORTAR', num: '04', title: 'Descarga tu skill de diseño' },
    ],
    downloadUrl: `${GITHUB_RAW}/tokidev-design-system/SKILL.md`,
    skillSlug: 'tokidev-design-system',
  },
] satisfies readonly ResourceCard[];

export function resourceById(id: number): ResourceCard | undefined {
  return RESOURCE_CARDS.find((r) => r.id === id);
}
