import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PROJECTS } from '../../../../content';
import { Project, ProjectFilter } from '../../../../core/models';
import { isLive } from '../../../../core/utils/project';
import { Reveal } from '../../../../shared/motion/reveal';
import { Spotlight } from '../../../../shared/motion/spotlight';
import { Icon } from '../../../../shared/ui/icon/icon';
import { ProjectArt } from '../../../../shared/ui/project-art/project-art';
import { StoreLinks } from '../../../../shared/ui/store-links/store-links';

interface FilterOption {
  id: ProjectFilter;
  label: string;
  matches: (project: Project) => boolean;
}

const FILTERS: FilterOption[] = [
  { id: 'all', label: 'All', matches: () => true },
  { id: 'live', label: 'Live on stores', matches: isLive },
  { id: 'flutter', label: 'Flutter', matches: (p) => p.group === 'flutter' },
  { id: 'native', label: 'Native Android', matches: (p) => p.group === 'native' },
  { id: 'rn', label: 'React Native', matches: (p) => p.group === 'rn' },
];

/** Every project as a card grid, filterable by store status and technology. */
@Component({
  selector: 'section[appAllWork]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, ProjectArt, Reveal, Spotlight, StoreLinks],
  host: { 'aria-labelledby': 'all-h' },
  templateUrl: './all-work.html',
  styleUrl: './all-work.scss',
})
export class AllWork {
  protected readonly isLive = isLive;
  protected readonly filters = FILTERS.map((f) => ({
    ...f,
    count: PROJECTS.filter(f.matches).length,
  }));
  protected readonly selected = signal<ProjectFilter>('all');

  protected readonly visible = computed(() => {
    const filter = FILTERS.find((f) => f.id === this.selected()) ?? FILTERS[0];
    return PROJECTS.filter(filter.matches);
  });

  private readonly appRef = inject(ApplicationRef);
  private readonly document = inject(DOCUMENT);

  /** First store link, used by the hover "open" button on each card. */
  protected storeUrl(project: Project): string | undefined {
    return project.stores.android ?? project.stores.ios;
  }

  /**
   * Switch filter. Where the browser supports view transitions, cards glide
   * to their new positions; elsewhere the grid updates instantly.
   */
  protected select(filter: ProjectFilter): void {
    if (filter === this.selected()) return;
    const view = this.document.defaultView;
    const reduce = view?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!this.document.startViewTransition || reduce) {
      this.selected.set(filter);
      return;
    }
    this.document.startViewTransition(() => {
      this.selected.set(filter);
      this.appRef.tick(); // render synchronously so the transition sees the new grid
    });
  }

  protected readonly countLabel = computed(() => {
    const n = this.visible().length;
    return `${n} ${n === 1 ? 'project' : 'projects'}`;
  });
}
