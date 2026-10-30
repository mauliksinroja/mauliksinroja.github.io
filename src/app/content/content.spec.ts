import { ARTICLES, PROJECTS, SECTION_IDS } from '.';
import { featured, isLive } from '../core/utils/project';

// Guards against mistakes when editing the content files by hand.
describe('content', () => {
  it('has unique project ids', () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('numbers featured projects 1, 2, 3… without gaps or repeats', () => {
    const ranks = featured(PROJECTS).map((p) => p.featuredRank);
    expect(ranks).toEqual(ranks.map((_, i) => i + 1));
  });

  it('only features apps that are live on a store', () => {
    expect(featured(PROJECTS).every(isLive)).toBe(true);
  });

  it('gives every live app a store icon', () => {
    const missing = PROJECTS.filter((p) => isLive(p) && !p.icon).map((p) => p.name);
    expect(missing).toEqual([]);
  });

  it('uses https links for articles', () => {
    expect(ARTICLES.every((a) => a.url.startsWith('https://'))).toBe(true);
  });

  it('ends navigation with the contact section', () => {
    expect(SECTION_IDS.at(-1)).toBe('contact');
  });
});
