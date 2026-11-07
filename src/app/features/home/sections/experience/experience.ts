import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CERTIFICATIONS, JOBS } from '../../../../content';
import { Reveal } from '../../../../shared/motion/reveal';
import { Icon } from '../../../../shared/ui/icon/icon';

/** Work history plus certifications and honours. */
@Component({
  selector: 'section[appExperience]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Reveal],
  host: { 'aria-labelledby': 'exp-h' },
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly jobs = JOBS;
  protected readonly certifications = CERTIFICATIONS;
}
