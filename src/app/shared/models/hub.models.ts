/** Category slugs aligned with badge CSS classes in global styles */
export type ResourceCategory =
  | 'prompts'
  | 'skills'
  | 'automatización';

export interface ResourceStatLine {
  icon: string;
  value: string;
  label: string;
}

/** Table-of-contents entry for the detail page sidebar. */
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
  sections?: readonly DetailSectionDef[];
  contentFile?: string;
  downloadUrl?: string;
  skillSlug?: string;
}
