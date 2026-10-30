import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Project } from '../../../core/models';

/**
 * Coloured tile for a project: the store icon when it loads, the monogram
 * when there is no icon or it fails. `size="lg"` is the "All work" card tile,
 * `size="sm"` the 48px tile in "Featured work".
 */
@Component({
  selector: 'app-project-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-art.html',
  styleUrl: './project-art.scss',
  host: {
    'aria-hidden': 'true',
    '[class.sm]': "size() === 'sm'",
    '[class.lg]': "size() === 'lg'",
    '[style.--art]': 'project().color',
  },
})
export class ProjectArt {
  readonly project = input.required<Project>();
  readonly size = input<'sm' | 'lg'>('lg');

  protected readonly iconFailed = signal(false);
  private readonly image = viewChild<ElementRef<HTMLImageElement>>('icon');

  constructor() {
    // The page is prerendered, so an icon can fail before Angular starts
    // listening for (error). Check once in the browser after hydration.
    afterNextRender(() => {
      const img = this.image()?.nativeElement;
      if (img?.complete && img.naturalWidth === 0) this.iconFailed.set(true);
    });
  }
}
