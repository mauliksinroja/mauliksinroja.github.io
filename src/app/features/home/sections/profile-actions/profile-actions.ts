import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../../../content';
import { Icon } from '../../../../shared/ui/icon/icon';

/** Primary call to action, profile links and the availability line. */
@Component({
  selector: 'app-profile-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './profile-actions.html',
  styleUrl: './profile-actions.scss',
})
export class ProfileActions {
  protected readonly profile = PROFILE;
  protected readonly enquiryHref = `mailto:${PROFILE.email}?subject=Project%20enquiry`;
}
