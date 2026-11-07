import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AI_TOOLS, PRINCIPLES } from '../../../../content';
import { Reveal } from '../../../../shared/motion/reveal';
import { Spotlight } from '../../../../shared/motion/spotlight';
import { StackIcon } from '../../../../shared/ui/stack-icon/stack-icon';

/** "How I build": three working principles and the AI tools in daily use. */
@Component({
  selector: 'section[appApproach]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, Spotlight, StackIcon],
  host: { 'aria-labelledby': 'approach-h' },
  templateUrl: './approach.html',
  styleUrl: './approach.scss',
})
export class Approach {
  protected readonly principles = PRINCIPLES;
  protected readonly aiTools = AI_TOOLS;
}
