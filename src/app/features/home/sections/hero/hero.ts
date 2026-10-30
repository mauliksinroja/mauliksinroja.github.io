import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../../../content';

/** Photo, title, name, one-line pitch and quick facts. */
@Component({
  selector: 'header[appHero]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = PROFILE;
}
