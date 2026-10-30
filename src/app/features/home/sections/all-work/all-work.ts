import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PROJECTS } from '../../../../content';
import { Project, ProjectFilter } from '../../../../core/models';
import { isLive } from '../../../../core/utils/project';
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
  imports: [ProjectArt, StoreLinks],
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

  protected readonly countLabel = computed(() => {
    const n = this.visible().length;
    return `${n} ${n === 1 ? 'project' : 'projects'}`;
  });
}
