import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ARTICLES, PROFILE } from '../../../../content';
import { Reveal } from '../../../../shared/motion/reveal';
import { Spotlight } from '../../../../shared/motion/spotlight';
import { ArticleCard } from './article-card';

/** "Writing": article cards from `content/articles.ts`. */
@Component({
  selector: 'section[appWriting]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ArticleCard, Reveal, Spotlight],
  host: { 'aria-labelledby': 'writing-h' },
  styles: `
    @use 'breakpoints' as bp;

    .articles {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;

      @include bp.from(bp.$tablet) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
    }
  `,
  template: `
    <div class="section-head">
      <h2 id="writing-h">Writing</h2>
      <a class="count" [href]="articlesUrl" rel="noopener" target="_blank"
        >All articles on LinkedIn</a
      >
    </div>
    <ul class="articles">
      @for (article of articles; track article.url; let i = $index) {
        <li appArticleCard appSpotlight [appReveal]="i" [article]="article"></li>
      }
    </ul>
  `,
})
export class Writing {
  protected readonly articles = ARTICLES;
  protected readonly articlesUrl = PROFILE.linkedInArticlesUrl;
}
