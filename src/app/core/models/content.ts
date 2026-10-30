import { IconName } from './icon-name';

export interface Article {
  title: string;
  url: string;
  /** Cover image: a full https URL or a path inside `public/`. */
  image?: string;
  source: string;
  audience: string;
  summary: string;
  /** Tile colour shown until (or instead of) the cover image. */
  color: string;
}

export interface Job {
  role: string;
  organisation: string;
  description: string;
  period: string;
}

export interface Certification {
  title: string;
  issuer: string;
  icon: IconName;
  iconSize: number;
  /** Awards use the amber star style; certificates use the neutral style. */
  kind: 'award' | 'certificate';
  url?: string;
}

export interface Principle {
  step: string;
  title: string;
  body: string;
}

/** A stack tag shows either a logo file from `public/` or an inline symbol. */
export type StackItemIcon = { logo: string } | { symbol: IconName };

export interface StackItem {
  label: string;
  icon: StackItemIcon;
}

export interface StackGroup {
  title: string;
  items: StackItem[];
}

export interface AiTool {
  name: string;
  vendor: string;
  icon: StackItemIcon;
}

export interface ToolboxItem {
  monogram: string;
  name: string;
  meta: string;
  color: string;
}

export interface NavItem {
  /** Element id of the section, also used for scroll-spy. */
  id: string;
  label: string;
  icon: IconName;
}
