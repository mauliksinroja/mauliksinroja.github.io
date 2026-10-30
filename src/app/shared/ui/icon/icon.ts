import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconName } from '../../../core/models';

/** Renders one symbol from `<app-icon-sprite>`. Decorative: hidden from assistive tech. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" aria-hidden="true" focusable="false">
      <use [attr.href]="href()" />
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(24);

  protected readonly href = computed(() => `#i-${this.name()}`);
}
