import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { PROFILE } from '../../content';
import { Icon } from '../../shared/ui/icon/icon';

const WORDS_PER_MINUTE = 230;

/** m:ss, like a music player. */
function clock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * Fixed "now playing" bar with availability and a contact shortcut.
 * Scrolling the page plays the "track": the progress bar follows scroll
 * position and the total is the page's estimated reading time.
 */
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
  protected readonly elapsed = signal('0:00');
  protected readonly total = signal('0:00');

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const view = this.document.defaultView;
      if (!view) return;

      const words = (this.document.querySelector('main')?.textContent ?? '').split(/\s+/).length;
      const totalSeconds = (words / WORDS_PER_MINUTE) * 60;
      this.total.set(clock(totalSeconds));

      let frame = 0;
      const update = () => {
        frame = 0;
        const root = this.document.documentElement;
        const max = root.scrollHeight - view.innerHeight;
        const progress = max > 0 ? Math.min(1, view.scrollY / max) : 0;
        this.host.style.setProperty('--p', progress.toFixed(4));
        this.elapsed.set(clock(progress * totalSeconds)); // re-renders only when the text changes
      };
      const onScroll = () => (frame ||= view.requestAnimationFrame(update));

      update();
      view.addEventListener('scroll', onScroll, { passive: true });
      view.addEventListener('resize', onScroll, { passive: true });
      destroyRef.onDestroy(() => {
        view.removeEventListener('scroll', onScroll);
        view.removeEventListener('resize', onScroll);
        if (frame) view.cancelAnimationFrame(frame);
      });
    });
  }
}
