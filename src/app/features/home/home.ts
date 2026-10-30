import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AllWork } from './sections/all-work/all-work';
import { Approach } from './sections/approach/approach';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { FeaturedWork } from './sections/featured-work/featured-work';
import { Hero } from './sections/hero/hero';
import { ProfileActions } from './sections/profile-actions/profile-actions';
import { Stack } from './sections/stack/stack';
import { Writing } from './sections/writing/writing';

/** The one-page portfolio. Section order and ids live here. */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AllWork,
    Approach,
    Contact,
    Experience,
    FeaturedWork,
    Hero,
    ProfileActions,
    Stack,
    Writing,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
