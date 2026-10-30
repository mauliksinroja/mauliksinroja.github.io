import { DestroyRef, DOCUMENT, Injectable, inject, signal } from '@angular/core';

/**
 * Tracks which page section is in view so navigation can highlight it.
 * Call `watch()` from the browser only (e.g. inside `afterNextRender`).
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpy {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  /** Id of the section currently in view. */
  readonly active = signal('top');

  watch(sectionIds: readonly string[]): void {
    const view = this.document.defaultView;
    if (!view || !('IntersectionObserver' in view)) return;

    const root = this.document.documentElement;
    const last = sectionIds[sectionIds.length - 1];
    const visible = new Map<string, boolean>();

    // The last section is too short to reach the observer's band, so it
    // becomes active once the page is scrolled to the bottom.
    const atBottom = () => view.innerHeight + view.scrollY >= root.scrollHeight - 2;

    const update = () => {
      const current = atBottom() ? last : sectionIds.find((id) => visible.get(id));
      if (current) this.active.set(current);
    };

    const observer = new view.IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        update();
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    for (const id of sectionIds) {
      const section = this.document.getElementById(id);
      if (section) observer.observe(section);
    }
    view.addEventListener('scroll', update, { passive: true });

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      view.removeEventListener('scroll', update);
    });
  }
}
