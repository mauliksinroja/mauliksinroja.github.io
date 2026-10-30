import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PROFILE, SIDEBAR_NAV, TOOLBOX } from '../../content';
import { ScrollSpy } from '../../core/services/scroll-spy';
import { Icon } from '../../shared/ui/icon/icon';

/** Desktop sidebar: section navigation and the "Toolbox" list. */
@Component({
  selector: 'aside[appSidebar]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly profile = PROFILE;
  protected readonly nav = SIDEBAR_NAV;
  protected readonly toolbox = TOOLBOX;
  protected readonly active = inject(ScrollSpy).active;
}
