import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE, SECTION_TABS } from '../../content';
import { ScrollSpy } from '../../core/services/scroll-spy';
import { StatusPill } from '../../shared/ui/status-pill/status-pill';

/**
 * Bar at the top of the main panel: monogram + status on phones,
 * section tabs + status on desktop.
 */
@Component({
  selector: 'app-top-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatusPill],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  protected readonly profile = PROFILE;
  protected readonly tabs = SECTION_TABS;
  protected readonly active = inject(ScrollSpy).active;
}
