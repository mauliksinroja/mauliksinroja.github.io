import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StackItemIcon } from '../../../core/models';
import { Icon } from '../icon/icon';

/** A technology mark: a logo file from `public/` or an inline symbol. */
@Component({
  selector: 'app-stack-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { style: 'display: contents' },
  template: `
    @if (logo(); as src) {
      <img [src]="src" alt="" [attr.width]="size()" [attr.height]="size()" />
    } @else if (symbol(); as name) {
      <app-icon [name]="name" [size]="size()" />
    }
  `,
})
export class StackIcon {
  readonly icon = input.required<StackItemIcon>();
  readonly size = input(16);

  protected readonly logo = computed(() => {
    const icon = this.icon();
    return 'logo' in icon ? icon.logo : null;
  });

  protected readonly symbol = computed(() => {
    const icon = this.icon();
    return 'symbol' in icon ? icon.symbol : null;
  });
}
