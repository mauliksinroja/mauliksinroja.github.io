import { DOCUMENT, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Soft light that follows the pointer across a card. Writes the pointer
 * position to `--mx` / `--my` on the element; the `.spotlight` class in
 * `_motion.scss` paints it. Listeners are added directly, outside change
 * detection, and only on devices that can hover.
 */
@Directive({
  selector: '[appSpotlight]',
  host: { class: 'spotlight' },
})
export class Spotlight {
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const view = inject(DOCUMENT).defaultView;

    afterNextRender(() => {
      if (!view?.matchMedia?.('(hover: hover)').matches) return;
      element.addEventListener(
        'pointermove',
        (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          element.style.setProperty('--mx', `${event.clientX - box.left}px`);
          element.style.setProperty('--my', `${event.clientY - box.top}px`);
        },
        { passive: true },
      );
    });
  }
}
