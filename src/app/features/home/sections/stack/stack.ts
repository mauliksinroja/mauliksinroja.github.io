import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STACK } from '../../../../content';
import { StackIcon } from '../../../../shared/ui/stack-icon/stack-icon';

/** Technologies grouped by area, each with its logo or a neutral symbol. */
@Component({
  selector: 'section[appStack]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StackIcon],
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
  `,
  template: `
    <h2 id="stack-h">Stack</h2>
    @for (group of groups; track group.title) {
      <div class="group">
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
