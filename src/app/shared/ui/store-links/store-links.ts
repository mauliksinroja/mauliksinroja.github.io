import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../../../core/models';
import { Icon } from '../icon/icon';

/** "Android" and "iOS" pill links for a project's store listings. */
@Component({
  selector: 'app-store-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  styles: `
    :host {
      display: flex;
      gap: 6px;
    }
  `,
  template: `
    @if (project().stores.android; as url) {
      <a
        class="store"
        [href]="url"
        target="_blank"
        rel="noopener"
        [attr.aria-label]="project().name + ' on Google Play'"
      >
        <app-icon name="play" [size]="12" />Android
      </a>
    }
    @if (project().stores.ios; as url) {
      <a
        class="store"
        [href]="url"
        target="_blank"
        rel="noopener"
        [attr.aria-label]="project().name + ' on the App Store'"
      >
        <app-icon name="phone" [size]="12" />iOS
      </a>
    }
  `,
})
export class StoreLinks {
  readonly project = input.required<Project>();
}
