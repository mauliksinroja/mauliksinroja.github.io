import { Project } from '../models';

/** A project is "live" when it has at least one store link. */
export function isLive(project: Project): boolean {
  return Boolean(project.stores.android || project.stores.ios);
}

/** Featured projects, ordered by `featuredRank`. */
export function featured(projects: readonly Project[]): Project[] {
  return projects
    .filter((p) => p.featuredRank !== undefined)
    .sort((a, b) => (a.featuredRank ?? 0) - (b.featuredRank ?? 0));
}
