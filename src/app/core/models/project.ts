export type ProjectStack = 'Flutter' | 'Kotlin' | 'Java' | 'React Native';

/** Filter groups used by the "All work" chips. */
export type ProjectGroup = 'flutter' | 'native' | 'rn';

export interface StoreLinks {
  android?: string;
  ios?: string;
}

export interface Project {
  id: string;
  name: string;
  /** Two-letter fallback shown when the app icon is missing or fails to load. */
  monogram: string;
  /** Tile background colour. */
  color: string;
  stack: ProjectStack;
  group: ProjectGroup;
  summary: string;
  industry: string;
  /** Store icon URL (App Store or Google Play CDN). */
  icon?: string;
  stores: StoreLinks;
  /** Position in "Featured work"; omit to leave the project out of it. */
  featuredRank?: number;
}

export type ProjectFilter = 'all' | 'live' | ProjectGroup;
