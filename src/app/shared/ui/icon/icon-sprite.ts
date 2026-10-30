import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Inline SVG symbol sprite. Rendered once by the app shell; `<app-icon>`
 * references symbols by id. Stack Overflow and HackerRank paths are the
 * official marks from Simple Icons (CC0).
 */
@Component({
  selector: 'app-icon-sprite',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  templateUrl: './icon-sprite.html',
})
export class IconSprite {}
