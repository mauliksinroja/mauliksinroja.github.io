import {
  DOCUMENT,
  Directive,
  ElementRef,
  Injectable,
  afterNextRender,
  inject,
  input,
} from '@angular/core';

/** One shared IntersectionObserver for every `[appReveal]` element. */
@Injectable({ providedIn: 'root' })
export class RevealObserver {
  private readonly document = inject(DOCUMENT);
  private observer?: IntersectionObserver;

  observe(element: HTMLElement): void {
    const view = this.document.defaultView;
    if (!view || !('IntersectionObserver' in view)) return;
    if (view.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // Elements already on screen are left alone: they were painted by the
    // prerendered HTML and must not blink out and back in.
    if (element.getBoundingClientRect().top < view.innerHeight) return;

    this.observer ??= new view.IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          // Drop the animation once it ends so hover transforms work again.
          const done = (event: AnimationEvent) => {
            if (event.target !== target) return;
            target.classList.remove('reveal-in');
            target.removeEventListener('animationend', done);
          };
          target.addEventListener('animationend', done);
          target.classList.replace('reveal-pending', 'reveal-in');
          observer.unobserve(target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    element.classList.add('reveal-pending');
    this.observer.observe(element);
  }
}

/**
 * Fades and lifts an element in the first time it scrolls into view.
 * `appReveal="3"` staggers it by its position in a list.
 *
 * Nothing is hidden in the prerendered HTML or without JavaScript; the
 * element is only hidden once the browser has started the app and the
 * element is still below the fold.
 */
@Directive({
  selector: '[appReveal]',
  host: { '[style.--i]': 'index()' },
})
export class Reveal {
  /** Position in a list, for staggering. Empty string means 0. */
  readonly appReveal = input<number | ''>('');
  protected readonly index = () => Number(this.appReveal() || 0);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const observer = inject(RevealObserver);
    afterNextRender(() => observer.observe(element));
  }
}
