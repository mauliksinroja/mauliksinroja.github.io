import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { PROFILE } from '../../content';

/** Set by the inline script in `index.html` when the loader is shown. */
declare global {
  interface Window {
    __loaderStart?: number;
  }
}

const MIN_VISIBLE_MS = 750;
const CSS_FADE_START_MS = 1150;
const HARD_STOP_MS = 1600;

/**
 * Equalizer loading screen. Whether it shows at all is decided before the
 * page paints by the inline script in `index.html` (first visit per session,
 * never with reduced motion). CSS fades it out after 1.2s on its own; this
 * component hands off earlier once the page has loaded, then removes it.
 */
@Component({
  selector: 'app-loading-screen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
})
export class LoadingScreen {
  protected readonly profile = PROFILE;

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => this.handOff());
  }

  private handOff(): void {
    const root = this.document.documentElement;
    const view = this.document.defaultView;
    if (!view || !root.classList.contains('show-loader')) {
      this.remove();
      return;
    }

    const shownAt = view.__loaderStart ?? 0;
    const elapsed = () => view.performance.now() - shownAt;

    const finish = () => {
      if (elapsed() >= CSS_FADE_START_MS) {
        this.remove(); // the CSS fade has already run
        return;
      }
      view.setTimeout(
        () => {
          root.classList.add('loader-done');
          view.setTimeout(() => this.remove(), 350);
        },
        Math.max(0, MIN_VISIBLE_MS - elapsed()),
      );
    };

    if (this.document.readyState === 'complete') finish();
    else view.addEventListener('load', finish, { once: true });
    view.setTimeout(() => this.remove(), Math.max(0, HARD_STOP_MS - elapsed()));
  }

  private remove(): void {
    this.host.nativeElement.style.display = 'none';
  }
}
