import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Article } from '../../../../core/models';
import { Icon } from '../../../../shared/ui/icon/icon';

/**
 * One article: cover image over a coloured tile. The tile (source, pen icon,
 * audience) stays visible until the cover loads, and remains if it fails.
 */
@Component({
  selector: 'li[appArticleCard]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  readonly article = input.required<Article>();

  protected readonly coverLoaded = signal(false);
  protected readonly coverFailed = signal(false);
  private readonly cover = viewChild<ElementRef<HTMLImageElement>>('cover');

  constructor() {
    // The cover may finish loading (or fail) before hydration attaches listeners.
    afterNextRender(() => {
      const img = this.cover()?.nativeElement;
      if (!img?.complete) return;
      if (img.naturalWidth > 0) this.coverLoaded.set(true);
      else this.coverFailed.set(true);
    });
  }
}
