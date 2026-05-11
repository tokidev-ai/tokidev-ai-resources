import type { DetailSectionDef, ResourceCard } from '../models/hub.models';

export type HubFilterSlug =
  | 'todos'
  | 'fundamentos'
  | 'prompts'
  | 'skills'
  | 'automatización'
  | 'negocio'
  | 'avanzado';

export const RESOURCE_FILTERS = [
  { slug: 'todos' as const, label: 'Todos' },
  { slug: 'fundamentos', label: 'Fundamentos' },
  { slug: 'prompts', label: 'Prompts' },
  { slug: 'skills', label: 'Skills' },
  { slug: 'automatización', label: 'Automatización' },
  { slug: 'negocio', label: 'Negocio' },
  { slug: 'avanzado', label: 'Avanzado' },
] satisfies ReadonlyArray<{ slug: HubFilterSlug; label: string }>;

/** Sample long-form sections (matches static prototype narrative). */
export const CAROUSEL_SAMPLE_SECTIONS = [
  {
    id: 'que-es',
    label: 'QUÉ ES',
    num: '01',
    title: 'Una skill que escribe carruseles como tú.',
  },
  {
    id: 'instalacion',
    label: 'INSTALACIÓN',
    num: '02',
    title: 'Cómo instalarla en Claude',
  },
  {
    id: 'reglas',
    label: 'LAS 5 REGLAS',
    num: '03',
    title: 'Las 5 reglas no negociables',
  },
  {
    id: 'ejemplo',
    label: 'EJEMPLO',
    num: '06',
    title: 'Un carrusel listicle · 9 slides',
  },
] satisfies readonly DetailSectionDef[];

export const RESOURCE_CARDS = [
  {
    id: 1,
    num: '01',
    category: 'fundamentos',
    title: 'El setup que hace que Claude trabaje por ti',
    desc: 'Plan, modelo, Project, Skills y connectors. Configurado en una tarde. Te dura el año.',
    meta: '· 6 min · skill incluida',
    cta: 'Leer',
    upcoming: false,
    detailStats: [
      { value: '📚 6 min', label: 'Lectura + skill' },
      { value: '⚙️ 5 piezas', label: 'Setup completo' },
      { value: '🌐 Libre', label: 'Para cualquier flujo' },
    ],
  },
  {
    id: 2,
    num: '02',
    category: 'negocio',
    title: 'Tu primer agente que cobra solo',
    desc: '7 días para montar un agente que entrega trabajo real a clientes. Plantillas listas.',
    meta: '· 7 días · setup completo',
    cta: 'Leer',
    upcoming: false,
    detailStats: [
      { value: '⏱ 7 días', label: 'Plan guiado' },
      { value: '💼 1 agente', label: 'Production-ready' },
      { value: '📑 Plantillas', label: 'Included' },
    ],
  },
  {
    id: 3,
    num: '03',
    category: 'skills',
    title: 'Carruseles que paran el scroll',
    desc: 'Skill plug-and-play para Claude. Hook, estructura, contenido y CTA. 6 tipos listos.',
    meta: '· skill · descarga directa',
    cta: 'Leer',
    upcoming: false,
    detailBadgeLabel: 'INSTAGRAM · CARRUSEL',
    detailStats: [
      { value: '📦 17 KB', label: 'SKILL.md + referencias' },
      { value: '🎯 6 tipos', label: 'de carrusel cubiertos' },
      { value: '🌐 Libre', label: 'Cualquier nicho' },
    ],
  },
  {
    id: 4,
    num: '04',
    category: 'prompts',
    title: 'El PRD antes de buildear',
    desc: '1 prompt + 1 template + 3 reglas. El filtro que te ahorra construir lo que no sirve.',
    meta: '· 1 prompt · 1 template',
    cta: 'Leer',
    upcoming: false,
    detailStats: [
      { value: '📝 1 prompt', label: '+ template vivo' },
      { value: '✅ 3 reglas', label: 'Filtro de scope' },
      { value: '⏳ Rápido', label: 'Antes del build' },
    ],
  },
  {
    id: 5,
    num: '05',
    category: 'avanzado',
    title: 'Tu propia IA local',
    desc: 'Agente open source con memoria, navegador y terminal. Todo en tu Mac, 10 minutos.',
    meta: '· 10 min de lectura',
    cta: 'Leer',
    upcoming: false,
    detailStats: [
      { value: '💻 Local', label: 'En tu máquina' },
      { value: '🧠 Memoria', label: '+ navegador + CLI' },
      { value: '⏱ 10 min', label: 'Kickoff rápido' },
    ],
  },
  {
    id: 6,
    num: '06',
    category: 'automatización',
    title: 'Automatiza tu Instagram con Claude',
    desc: 'Próximamente',
    meta: '· 15 min',
    cta: 'Próximamente',
    upcoming: true,
    detailStats: [
      { value: '⋯', label: 'En camino' },
      { value: '📅', label: 'Pronto' },
      { value: '✨', label: 'Skills' },
    ],
  },
  {
    id: 7,
    num: '07',
    category: 'prompts',
    title: 'Prompts que siempre funcionan',
    desc: 'Próximamente',
    meta: '· 8 min',
    cta: 'Próximamente',
    upcoming: true,
    detailStats: [
      { value: '⋯', label: 'En camino' },
      { value: '📚', label: 'Prompt book' },
      { value: '✨', label: 'Ejemplos' },
    ],
  },
  {
    id: 8,
    num: '08',
    category: 'fundamentos',
    title: 'Memoria persistente en Claude',
    desc: 'Configura la memoria de Claude para que te recuerde entre sesiones.',
    meta: '· 5 min · skill incluida',
    cta: 'Leer',
    upcoming: false,
    detailStats: [
      { value: '🧠 5 min', label: 'Walkthrough' },
      { value: '📎 Skill', label: 'Incluida' },
      { value: '🔄 Persistente', label: 'entre sesiones' },
    ],
  },
  {
    id: 9,
    num: '09',
    category: 'skills',
    title: 'Skill para revisar tu LinkedIn',
    desc: 'Auditoría de perfil para developers. 10 aspectos clave con ejemplos.',
    meta: '· skill · descarga directa',
    cta: 'Leer',
    upcoming: false,
    detailStats: [
      { value: '👤 Perfil', label: 'Audit completo' },
      { value: '🔟 Hits', label: '10 focos revisados' },
      { value: '📎 Skill', label: 'Descarga directa' },
    ],
  },
] satisfies readonly ResourceCard[];

export function resourceById(id: number): ResourceCard | undefined {
  return RESOURCE_CARDS.find((r) => r.id === id);
}
