import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STACK } from '../../../../content';
import { Reveal } from '../../../../shared/motion/reveal';
import { StackIcon } from '../../../../shared/ui/stack-icon/stack-icon';

/** Technologies grouped by area, each with its logo or a neutral symbol. */
@Component({
  selector: 'section[appStack]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, StackIcon],
  host: { 'aria-labelledby': 'stack-h' },
  styles: `
    .group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      li {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 14px 7px 12px;
        border-radius: var(--radius-full);
        background: var(--bg-interactive);
        font-size: 14px;
        color: var(--text-bright-subdued);
      }

      span {
        color: var(--text-base);
      }
    }

    @media (hover: hover) and (prefers-reduced-motion: no-preference) {
      .tags li {
        transition:
          transform var(--dur-fast) var(--ease-out),
          background-color var(--dur-fast) linear;

        &:hover {
          transform: translateY(-2px);
          background: var(--bg-card);
        }
      }
    }
  `,
  template: `
    <h2 id="stack-h">Stack</h2>
    @for (group of groups; track group.title; let i = $index) {
      <div class="group" [appReveal]="i">
        <h3 class="overline">{{ group.title }}</h3>
        <ul class="tags">
          @for (item of group.items; track item.label) {
            <li>
              <app-stack-icon [icon]="item.icon" /><span>{{ item.label }}</span>
            </li>
          }
        </ul>
      </div>
    }
  `,
})
export class Stack {
  protected readonly groups = STACK;
}
