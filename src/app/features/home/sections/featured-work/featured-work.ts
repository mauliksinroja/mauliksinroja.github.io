import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE, PROJECTS } from '../../../../content';
import { featured } from '../../../../core/utils/project';
import { ProjectArt } from '../../../../shared/ui/project-art/project-art';
import { StoreLinks } from '../../../../shared/ui/store-links/store-links';

/** Numbered track list of the projects marked with `featuredRank`. */
@Component({
  selector: 'section[appFeaturedWork]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectArt, StoreLinks],
  host: { 'aria-labelledby': 'featured-h' },
  templateUrl: './featured-work.html',
  styleUrl: './featured-work.scss',
})
export class FeaturedWork {
  protected readonly projects = featured(PROJECTS);
  protected readonly playStoreUrl = PROFILE.playStoreDeveloperUrl;
}
