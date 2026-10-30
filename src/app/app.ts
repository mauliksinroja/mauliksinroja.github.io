import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { Home } from './features/home/home';
import { PROFILE, SECTION_IDS } from './content';
import { ScrollSpy } from './core/services/scroll-spy';
import { SeoMeta } from './core/services/seo-meta';
import { BottomNav } from './layout/bottom-nav/bottom-nav';
import { LoadingScreen } from './layout/loading-screen/loading-screen';
import { PlayerBar } from './layout/player-bar/player-bar';
import { Sidebar } from './layout/sidebar/sidebar';
import { SiteFooter } from './layout/site-footer/site-footer';
import { TopBar } from './layout/top-bar/top-bar';
import { IconSprite } from './shared/ui/icon/icon-sprite';

/**
 * App shell: sidebar + main panel + fixed player bar and bottom nav.
 * The site is a single page, so there is no router; add `provideRouter`
 * and a `<router-outlet>` here if more pages are needed later.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Home, BottomNav, IconSprite, LoadingScreen, PlayerBar, Sidebar, SiteFooter, TopBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly scrollSpy = inject(ScrollSpy);

  constructor() {
    inject(SeoMeta).apply(PROFILE);
    afterNextRender(() => this.scrollSpy.watch(SECTION_IDS));
  }
}
