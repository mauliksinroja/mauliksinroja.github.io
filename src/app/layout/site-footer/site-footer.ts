import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../content';

@Component({
  selector: 'footer[appSiteFooter]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    @use 'breakpoints' as bp;

    :host {
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: var(--text-subdued);
      margin-top: 32px;
      box-shadow: inset 0 1px 0 var(--hairline);

      @include bp.from(bp.$tablet) {
        flex-direction: row;
        justify-content: space-between;
        padding: 32px;
      }
    }

    a:hover {
      color: var(--text-base);
    }
  `,
  template: `
    <span>© {{ year }} {{ profile.name }} · {{ profile.location }}</span>
    <span>
      <a [href]="profile.upworkUrl" rel="noopener" target="_blank">Upwork</a>
      · {{ profile.languages.join(' · ') }}
    </span>
  `,
})
export class SiteFooter {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
