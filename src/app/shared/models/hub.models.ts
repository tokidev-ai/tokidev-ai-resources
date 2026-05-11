/** Category slugs aligned with badge CSS classes in global styles */
export type ResourceCategory =
  | 'fundamentos'
  | 'prompts'
  | 'skills'
  | 'automatización'
  | 'negocio'
  | 'avanzado';

export interface ResourceStatLine {
  value: string;
  label: string;
}

/** Table-of-contents sections for the prototype detail layout (structured, no unsafe HTML). */
export interface DetailSectionDef {
  id: string;
  label: string;
  num: string;
  title: string;
}

export interface ResourceCard {
  id: number;
  num: string;
  category: ResourceCategory;
  title: string;
  desc: string;
  meta: string;
  cta: string;
  upcoming: boolean;
  detailBadgeLabel?: string;
  detailStats?: readonly ResourceStatLine[];
}
