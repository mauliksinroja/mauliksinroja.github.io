import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../../../content';

@Component({
  selector: 'section[appContact]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'contact-h' },
  styles: `
    @use 'breakpoints' as bp;

    :host {
      margin: 28px 16px 0;
      padding: 24px 20px;
      border-radius: var(--radius-lg);
      background: var(--bg-card);
      display: flex;
      flex-direction: column;
      gap: 12px;

      @include bp.from(bp.$tablet) {
        margin: 40px 32px 0;
        padding: 40px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
      }
    }

    .copy {
      @include bp.from(bp.$tablet) {
        display: flex;
        flex-direction: column;
        max-width: 620px;
        gap: 8px;
      }
    }

    h2 {
      font-size: 26px;
      line-height: 1.15;
      font-weight: 800;

      @include bp.from(bp.$tablet) {
        font-size: 32px;
      }
    }

    p {
      font-size: 15px;
      line-height: 1.5;
      color: var(--text-subdued);

      @include bp.from(bp.$tablet) {
        font-size: 16px;
      }
    }

    .cta {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;

      @include bp.from(bp.$tablet) {
        align-items: flex-end;
      }

      span {
        font-size: 14px;
        color: var(--text-subdued);
        text-align: center;
      }
    }
  `,
  template: `
    <div class="copy">
      <h2 id="contact-h">Have a mobile product on the roadmap?</h2>
      <p>
        Tell me what you are building and your timeline — a first version, or an app already in the
        stores that needs a steady hand.
      </p>
    </div>
    <div class="cta">
      <a class="btn-primary" [href]="enquiryHref">Start a conversation</a>
      <span>{{ email }}</span>
    </div>
  `,
})
export class Contact {
  protected readonly email = PROFILE.email;
  protected readonly enquiryHref = `mailto:${PROFILE.email}?subject=Project%20enquiry`;
}
