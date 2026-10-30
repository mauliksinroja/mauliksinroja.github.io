import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Availability } from '../../../core/models';

/** Rounded pill showing availability with a coloured dot. */
@Component({
  selector: 'app-status-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @use 'breakpoints' as bp;

    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: var(--radius-full);
      background: var(--bg-base);
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;

      @include bp.from(bp.$desktop-sm) {
        font-size: 14px;
        padding: 8px 16px;
      }
    }
  `,
  template: `<span class="dot" [class.is-open]="availability().state === 'open'"></span
    >{{ availability().label }}`,
})
export class StatusPill {
  readonly availability = input.required<Availability>();
}
