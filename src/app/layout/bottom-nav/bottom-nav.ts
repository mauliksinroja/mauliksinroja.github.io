import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BOTTOM_NAV } from '../../content';
import { ScrollSpy } from '../../core/services/scroll-spy';
import { Icon } from '../../shared/ui/icon/icon';

/** Tab bar fixed to the bottom of the screen on phones. */
@Component({
  selector: 'nav[appBottomNav]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { 'aria-label': 'Primary' },
  styles: `
    @use 'breakpoints' as bp;

    :host {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      height: 64px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      background: var(--bg-base);

      @include bp.from(bp.$desktop-sm) {
        display: none;
      }
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 10.5px;
      color: var(--text-subdued);

      &[aria-current='true'] {
        color: var(--text-base);
        font-weight: 700;
      }
    }
  `,
  template: `
    @for (item of items; track item.id) {
      <a [href]="'#' + item.id" [attr.aria-current]="active() === item.id ? 'true' : null">
        <app-icon [name]="item.icon" [size]="22" />{{ item.label }}
      </a>
    }
  `,
})
export class BottomNav {
  protected readonly items = BOTTOM_NAV;
  protected readonly active = inject(ScrollSpy).active;
}
