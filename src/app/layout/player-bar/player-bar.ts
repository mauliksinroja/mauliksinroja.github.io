import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../content';
import { Icon } from '../../shared/ui/icon/icon';

/** Fixed "now playing" bar with availability and a contact shortcut. */
@Component({
  selector: 'aside[appPlayerBar]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { 'aria-label': 'Availability' },
  templateUrl: './player-bar.html',
  styleUrl: './player-bar.scss',
})
export class PlayerBar {
  protected readonly profile = PROFILE;
}
